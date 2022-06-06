import { Request } from "./request";
import { v4 as uuidv4 } from 'uuid';
import { LocalStoreConfig } from "../widgets/ConifgLocalstorageUtil";
import { Schema } from './schema/schema';



export class Config {
    app_name: string | undefined;
    endpoint: string | undefined;
    fullpath: string | undefined;
    filename: string | undefined;
    version: string | undefined;
    app_id: string | undefined;
    notificationID: string | undefined;
    user: Schema.User = {} as Schema.User;
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
            return element !== value;
        });
    }


    export const proto_content = `
syntax = "proto3";

package csdi;
import 'record_metadata_options.proto';

message User {
    string email = 1 [ (webaas.db.record.field).primary_key = true ];
    string username = 2;
    string password = 3;
    string profile_photo = 4;
    repeated string follow_tag_arr = 5;  // get following tag by follow_tag
    repeated string published_article_arr = 6;  // get published article by article_id
    repeated string bookmark_article_arr = 7;  // get bookmarded article by article_id
}

message Article {
    string article_id =1 [ (webaas.db.record.field).primary_key = true ];   // uuid
    string email = 2;
    string author = 3;
    string user_photo = 4;
    string location = 5;
    repeated string article_photo = 6;
    string content = 7;
    string post_time = 8;
    repeated string related_tag_arr = 9;    // get related tag by related_tag
}

message Tag {
    string tagname = 1 [ (webaas.db.record.field).primary_key = true ];
    repeated string article_arr = 2;    // foreign key
}`;

    export const profile_photo = `data:image/jpeg;base64,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`;

    export function sort_article(articles: Schema.Article[]): Schema.Article[] {
        return articles.sort((a: Schema.Article, b: Schema.Article) => {
            if (a.post_time > b.post_time) return -1;
            if (a.post_time < b.post_time) return 1;
            return 0;
        })
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
        // await Request.register_app(config);
        config.app_id = "5b1c7e5a-9647-49e1-81e6-93b5683362ee";
        // await Request.upload_schema(config, Util.proto_content);
        // await Request.update_schema(config);

        return config;
    }

    export async function signup(config: Config, email: string, username: string, password: string) {
        let user: Schema.User = {
            email: email,
            username: username,
            password: password,
            profile_photo: "Util.profile_photo",
            follow_tag_arr: [],
            published_article_arr: [],
            bookmark_article_arr: [],
        };

        let user_content = JSON.stringify(user);

        await Request.put_record(config, user_content, Util.SchemaName.User);
    }

    export async function login(config: Config, email: string, password: string) {
        config.user = {} as Schema.User;
        await Request.get_record_by_key(config, email, Util.SchemaName.User)
            .then((value) => {
                console.log(value)
                let user = value as Schema.User;
                console.log(user)
                if (user.password === password) {
                    config.user = user;
                    console.log("login successful");
                } else {
                    console.log("login failed");
                    return;
                }
            });

        await Request.register_notification(config, Util.SchemaName.Tag, config.user.follow_tag_arr).then((value) => {
            let notificationid = value;
            config.notificationID = notificationid;
            LocalStoreConfig.set_config(config);
        })
    }

    export function logout(config: Config) {
        config.user = {} as Schema.User;
        LocalStoreConfig.remove_config();
        console.log("logout");
    }

    // cancel account when logged in
    export async function cancel(config: Config) {
        await Request.delete_record(config, config.user.username, Util.SchemaName.User);
        logout(config);
    }

    export async function publish_article_transactional(config: Config, content: string, location: string, article_photo: string[], related_tag_arr: string[]) {
        const article: Schema.Article = {
            article_id: uuidv4(),
            email: config.user.email,
            author: config.user.username,
            user_photo: config.user.profile_photo,
            location: location,
            article_photo: article_photo,
            content: content,
            post_time: new Date().toUTCString(),
            related_tag_arr: related_tag_arr,
        };

        config.user.published_article_arr.push(article.article_id);
        LocalStoreConfig.set_config(config);

        let transaction_id: string = await Request.begin_transaction();

        await Request.put_record_transactional(config, JSON.stringify(config.user), Util.SchemaName.User, transaction_id);
        await Request.put_record_transactional(config, JSON.stringify(article), Util.SchemaName.Article, transaction_id);
        for (let related_tag of related_tag_arr) {
            await Request.get_record_by_key(config, related_tag, Util.SchemaName.Tag).then(async (value) => {
                let tag = value as Schema.Tag;
                tag.article_arr.push(article.article_id);
                LocalStoreConfig.set_config(config);
                await Request.put_record_transactional(config, JSON.stringify(tag), Util.SchemaName.Tag, transaction_id);
            }).catch((reason) => {
                console.log(reason);
            });
        }

        await Request.commit_transaction(transaction_id);
    }

    export async function publish_article(config: Config, content: string, location: string, article_photo: string[], related_tag_arr: string[]) {
        console.log(article_photo)
        const article: Schema.Article = {
            article_id: uuidv4(),
            email: config.user.email,
            author: config.user.username,
            user_photo: config.user.profile_photo,
            location: location,
            article_photo: article_photo,
            content: content,
            post_time: new Date().toUTCString(),
            related_tag_arr: related_tag_arr,
        };

        config.user.published_article_arr.push(article.article_id);
        LocalStoreConfig.set_config(config);

        await Request.put_record(config, JSON.stringify(config.user), Util.SchemaName.User);
        await Request.put_record(config, JSON.stringify(article), Util.SchemaName.Article);

        let tag = {} as Schema.Tag;
        for (let related_tag of related_tag_arr) {
            await Request.get_record_by_key(config, related_tag, Util.SchemaName.Tag).then((value) => {
                tag = value as Schema.Tag;
                tag.article_arr.push(article.article_id);
            }).catch((_) => {
                tag.tagname = related_tag;
                tag.article_arr = [article.article_id];
            });
            await Request.put_record(config, JSON.stringify(tag), Util.SchemaName.Tag);
            LocalStoreConfig.set_config(config);
        }
    }



    export async function list_article_for_tag(config: Config, tagname: string): Promise<Schema.Article[]> {
        let res: Schema.Article[] = [];

        // list tag related articles only
        // get all article_id by tag

        await Request.get_record_by_key(config, tagname, Util.SchemaName.Tag)
            .then(async (value) => {
                let tag = value as Schema.Tag;
                // get all article by article_id
                for (let article_id of tag.article_arr) {
                    await Request.get_record_by_key(config, article_id, Util.SchemaName.Article)
                        .then((value) => {
                            res.push(value as Schema.Article);
                        }).catch((reason) => {
                            console.log(reason);
                        });
                }
            }).catch((reason) => {
                console.log(reason);
            });


        return Util.sort_article(res);
    }

    export async function list_article_for_user(config: Config): Promise<Schema.Article[]> {
        // no follow tag, just list all
        if (config.user.follow_tag_arr.length === 0) {
            return list_article(config);
        }

        let res: Schema.Article[] = [];

        // list related articles only
        // get all article_id by tag
        for (let follow_tag of config.user.follow_tag_arr) {
            await Request.get_record_by_key(config, follow_tag, Util.SchemaName.Tag)
                .then(async (value) => {
                    let tag = value as Schema.Tag;
                    // get all article by article_id
                    for (let article_id of tag.article_arr) {
                        await Request.get_record_by_key(config, article_id, Util.SchemaName.Article)
                            .then((value) => {
                                res.push(value as Schema.Article);
                            }).catch((reason) => {
                                console.log(reason);
                            });
                    }
                }).catch((reason) => {
                    console.log(reason);
                });
        }

        return Util.sort_article(res);
    }

    export async function remove_article(config: Config, article: Schema.Article) {
        let article_id = article.article_id;
        let related_tag_arr = article.related_tag_arr;

        if (!config.user.published_article_arr.includes(article_id)) {
            console.log("permission denied");
            return;
        }

        config.user.published_article_arr = Util.remove_string_element(config.user.published_article_arr, article_id);
        await Request.put_record(config, JSON.stringify(config.user), Util.SchemaName.User);

        await Request.delete_record(config, article_id, Util.SchemaName.Article);

        for (let related_tag of related_tag_arr) {
            await Request.get_record_by_key(config, related_tag, Util.SchemaName.Tag).then(async (value) => {
                let tag = value as Schema.Tag;
                tag.article_arr = Util.remove_string_element(tag.article_arr, article_id);
                await Request.put_record(config, JSON.stringify(tag), Util.SchemaName.Tag);
            }).catch((reason) => {
                console.log(reason);
            });
        }
    }

    export async function follow_tag(config: Config, tagname: string) {
        config.user.follow_tag_arr.push(tagname);
        await Request.put_record(config, JSON.stringify(config.user), Util.SchemaName.User);
        await Request.register_notification(config, Util.SchemaName.Tag, config.user.follow_tag_arr, config.notificationID).then((value) => {
            let newNotificationID = value;
            config.notificationID = newNotificationID;
            LocalStoreConfig.set_config(config);
        })
    }

    export async function unfollow_tag(config: Config, tagname: string) {
        config.user.follow_tag_arr = Util.remove_string_element(config.user.follow_tag_arr, tagname);
        await Request.put_record(config, JSON.stringify(config.user), Util.SchemaName.User);
        await Request.register_notification(config, Util.SchemaName.Tag, config.user.follow_tag_arr, config.notificationID).then((value) => {
            let newNotificationID = value;
            config.notificationID = newNotificationID;
            LocalStoreConfig.set_config(config);
        })
    }

    export async function mark_article(config: Config, article_id: string) {
        config.user.bookmark_article_arr.push(article_id);
        LocalStoreConfig.set_config(config);
        await Request.put_record(config, JSON.stringify(config.user), Util.SchemaName.User);
    }

    export async function unmark_article(config: Config, article_id: string) {
        config.user.bookmark_article_arr = Util.remove_string_element(config.user.bookmark_article_arr, article_id);
        LocalStoreConfig.set_config(config);
        await Request.put_record(config, JSON.stringify(config.user), Util.SchemaName.User);
    }

    export async function list_user(config: Config): Promise<Schema.User[]> {
        let res: Schema.User[] = [];

        await Request.get_range_record_by_key(config, Util.SchemaName.User)
            .then((users) => {
                for (let user of users) {
                    res.push(user as Schema.User);
                }
            }).catch((reason) => {
                console.log(reason);
            });


        return res;
    }

    export async function list_article(config: Config): Promise<Schema.Article[]> {
        let res: Schema.Article[] = [];

        await Request.get_range_record_by_key(config, Util.SchemaName.Article)
            .then((articles) => {
                for (let article of articles) {
                    res.push(article as Schema.Article);
                }
            }).catch((reason) => {
                console.log(reason);
            });


        return Util.sort_article(res);
    }

    export async function list_tag(config: Config): Promise<Schema.Tag[]> {
        let res: Schema.Tag[] = [];

        await Request.get_range_record_by_key(config, Util.SchemaName.Tag)
            .then((tags) => {

                for (let tag of tags) {
                    res.push(tag as Schema.Tag);
                }

            }).catch((reason) => {
                console.log(reason);
            });


        return res;
    }

    export async function add_tag(config: Config, tagname: string) {
        let tag: Schema.Tag = {
            tagname: tagname,
            article_arr: [],
        };
        const tag_content = JSON.stringify(tag);

        await Request.put_record(config, tag_content, Util.SchemaName.Tag);
    }
}
