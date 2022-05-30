import { Request } from "./request";
import { csdi } from "./proto/koke_kokko";
import { readFile } from 'fs/promises';
import { Logger } from "tslog";
import { v4 as uuidv4 } from 'uuid';
const log: Logger = new Logger();

export interface Config {
    app_name: string,
    endpoint: string,
    fullpath: string,
    filename: string,
    version: string,
    app_id: string,
    user: csdi.User
}

    namespace Util {
    export enum SchemaName {
        User = "csdi.User",
        Article = "csdi.Article",
        Tag = "csdi.Tag",
        Error = "csdi.Error",
    }

    export function remove_string_element(array: string[], value: string) {
        return array.filter((element) => {
            return element != value;
        });
    }
}

// init_config
// user behavior:
// user: signup + login + logout + cancel
// article: publish_article + list_article_for_user + remove_article
// tag: follow_tag + unfollow_tag
// app behavior:
// user: signup + list_user
// article: publish_article + list_article
// tag: add_tag + list_tag
export namespace Service {
    export async function init_config(app_name: string, endpoint: string, fullpath: string, filename: string, version: string): Promise<Config> {
        let config = {
            app_name: app_name,
            endpoint: endpoint,
            fullpath: fullpath,
            filename: filename,
            version: version,
        } as Config;

        await Request.register_app(config);
        const content = await readFile(config.fullpath);
        await Request.upload_schema(config, content);
        await Request.update_schema(config);
        return config;
    }

    export async function signup(config: Config, username: string, password: string) {
        const user_content = new csdi.User({
            username: username,
            password: password,
            follow_tag_arr: [],
            article_id_arr: [],
        }).serializeBinary();

        await Request.put_record(config, user_content, Util.SchemaName.User);
    }

    export async function login(config: Config, username: string, password: string) {
        config.user = {} as csdi.User;
        await Request.get_record_by_key(config, username, Util.SchemaName.User)
            .then((value) => {
                let user = csdi.User.deserializeBinary(value);
                if (user.password == password) {
                    config.user = user;
                    log.silly("login successful");
                } else {
                    log.silly("login failed");
                }
            });
    }

    export function logout(config: Config) {
        config.user = {} as csdi.User;
        log.silly("logout");
    }

    // cancel account when logged in
    export async function cancel(config: Config) {
        await Request.delete_record(config, config.user.username, Util.SchemaName.User);
        config.user = {} as csdi.User;
    }

    export async function publish_article(config: Config, title: string, content: string, related_tag_arr: string[]) {
        const article = new csdi.Article({
            article_id: uuidv4(),
            title: title,
            author: config.user.username,
            content: content,
            post_time: new Date().toUTCString(),
            related_tag_arr: related_tag_arr,
        });

        config.user.article_id_arr.push(article.article_id);

        await Request.put_record(config, config.user.serializeBinary(), Util.SchemaName.User);
        await Request.put_record(config, article.serializeBinary(), Util.SchemaName.Article);
        for (let related_tag of related_tag_arr) {
            await Request.get_record_by_key(config, related_tag, Util.SchemaName.Tag).then(async (value) => {
                let tag: csdi.Tag = csdi.Tag.deserializeBinary(value);
                tag.article_id_arr.push(article.article_id);
                await Request.put_record(config, tag.serializeBinary(), Util.SchemaName.Tag);
            }).catch((reason) => {
                log.silly(reason);
            });
        }
    }

    export async function list_article_for_user(config: Config): Promise<csdi.Article[]> {
        // no follow tag, just list all
        if (config.user.follow_tag_arr.length == 0) {
            return list_article(config);
        }

        let res: csdi.Article[] = [];

        // list related articles only
        // get all article_id by tag
        for (let follow_tag of config.user.follow_tag_arr) {
            await Request.get_record_by_key(config, follow_tag, Util.SchemaName.Tag)
                .then(async (value) => {
                    let tag: csdi.Tag = csdi.Tag.deserializeBinary(value);
                    // get all article by article_id
                    for (let article_id of tag.article_id_arr) {
                        await Request.get_record_by_key(config, article_id, Util.SchemaName.Article)
                            .then((value) => {
                                res.push(csdi.Article.deserializeBinary(value));
                            }).catch((reason) => {
                                log.silly(reason);
                            });
                    }
                }).catch((reason) => {
                    log.silly(reason);
                });
        }

        return res;
    }

    export async function remove_article(config: Config, article: csdi.Article) {
        let article_id = article.article_id;
        let related_tag_arr = article.related_tag_arr;

        if (!config.user.article_id_arr.includes(article_id)) {
            log.silly("permission denied");
            return;
        }

        config.user.article_id_arr = Util.remove_string_element(config.user.article_id_arr, article_id);
        await Request.put_record(config, config.user.serializeBinary(), Util.SchemaName.User);

        await Request.delete_record(config, article_id, Util.SchemaName.Article);

        for (let related_tag of related_tag_arr) {
            await Request.get_record_by_key(config, related_tag, Util.SchemaName.Tag).then(async (value) => {
                let tag: csdi.Tag = csdi.Tag.deserializeBinary(value);
                tag.article_id_arr = Util.remove_string_element(tag.article_id_arr, article_id);
                await Request.put_record(config, tag.serializeBinary(), Util.SchemaName.Tag);
            }).catch((reason) => {
                log.silly(reason);
            });
        }
    }

    export async function follow_tag(config: Config, tagname: string) {
        config.user.follow_tag_arr.push(tagname);

        await Request.put_record(config, config.user.serializeBinary(), Util.SchemaName.User);
    }

    export async function unfollow_tag(config: Config, tagname: string) {
        config.user.follow_tag_arr = Util.remove_string_element(config.user.follow_tag_arr, tagname);

        await Request.put_record(config, config.user.serializeBinary(), Util.SchemaName.User);
    }

    export async function list_user(config: Config): Promise<csdi.User[]> {
        let res: csdi.User[] = [];
        let integrity: boolean = false;
        while (!integrity) {
            await Request.get_range_record_by_key(config, Util.SchemaName.User)
                .then((users) => {
                    try {
                        for (let user of users) {
                            res.push(csdi.User.deserializeBinary(user));
                        }
                        integrity = true;
                    } catch (_) {
                        log.silly(res);
                        log.silly("retry");
                        res = [];
                    }
                }).catch((reason) => {
                    log.silly(reason);
                });
        }

        return res;
    }

    export async function list_article(config: Config): Promise<csdi.Article[]> {
        let res: csdi.Article[] = [];
        let integrity: boolean = false;
        while (!integrity) {
            await Request.get_range_record_by_key(config, Util.SchemaName.Article)
                .then((articles) => {
                    try {
                        for (let article of articles) {
                            res.push(csdi.Article.deserializeBinary(article));
                        }
                        integrity = true;
                    } catch (_) {
                        log.silly("retry");
                        res = [];
                    }

                }).catch((reason) => {
                    log.silly(reason);
                });
        }

        return res;
    }

    export async function list_tag(config: Config): Promise<csdi.Tag[]> {
        let res: csdi.Tag[] = [];
        let integrity: boolean = false;
        while (!integrity) {
            await Request.get_range_record_by_key(config, Util.SchemaName.Tag)
                .then((tags) => {
                    try {
                        for (let tag of tags) {
                            res.push(csdi.Tag.deserializeBinary(tag));
                        }
                        integrity = true;
                    } catch (_) {
                        log.silly("retry");
                        res = [];
                    }
                }).catch((reason) => {
                    log.silly(reason);
                });
        }

        return res;
    }

    export async function add_tag(config: Config, tagname: string) {
        const tag_content = new csdi.Tag({
            tagname: tagname,
            article_id_arr: [],
        }).serializeBinary();

        await Request.put_record(config, tag_content, Util.SchemaName.Tag);
    }
}
