import { Config, Service } from './services/service';


let app_name: string = 'kobe_kokko-v0.0.9';
let endpoint: string = 'http://202.120.40.82:11233';
let fullpath: string = 'dist/proto/koke_kokko.proto';
let filename: string = 'koke_kokko.proto';
let version: string = 'v0.0.1';

let users = [
    ['alice', 'alice_pwd'],
    ['bob', 'bob_pwd'],
    ['caka', 'caka_pwd'],
    ['david', 'david_pwd'],
    ['fox', 'fox_pwd'],
];

let tags = [
    'tag_1',
    'tag_2',
    'tag_3',
    'tag_4',
    'tag_5',
    'tag_6',
];

interface ArticleData {
    title: string,
    content: string,
    tags: string[],
};

let articles: ArticleData[] = [
    { title: "title_1", content: "content_1", tags: [tags[0], tags[1]] },
    { title: "title_2", content: "content_2", tags: [tags[1], tags[2]] },
    { title: "title_3", content: "content_3", tags: [tags[3], tags[4], tags[5]] },
    { title: "title_4", content: "content_4", tags: [tags[0], tags[5]] },
    { title: "title_5", content: "content_5", tags: [tags[3], tags[4]] },
    { title: "title_6", content: "content_6", tags: [tags[2]] },
]

// app behavior
// init app & add users & add tags
async function app_init(): Promise<Config> {
    let config = {} as Config;
    await Service.init_config(app_name, endpoint, fullpath, filename, version).then((value) => {
        console.log(value);
        config = value;
    }).catch((reason) => {
        console.log(reason);
    });

    for (let user of users) {
        await Service.signup(config, user[0], user[1]);
    }

    for (let tag of tags) {
        await Service.add_tag(config, tag);
    }

    return config;
}

// user behavior
// article
// login & publish 3 article & delete 1 article
async function track_article(config: Config) {
    let user = users[1];
    await Service.login(config, user[0], user[1]);

    for (let article of articles.slice(0, 2)) {
        await Service.publish_article(config, article.title, article.content, article.tags);
    }

    Service.logout(config);
    user = users[2];
    await Service.login(config, user[0], user[1]);
    for (let article of articles.slice(2)) {
        await Service.publish_article(config, article.title, article.content, article.tags);
    }

    // await Service.list_article_for_user(config).then((articles) => {
    //     for (let article of articles) {
    //         console.log(article);
    //         // await Service.remove_article
    //     }
    // });
}

// tag
// browse articles & follow tag & browse articles & unfollow tag & browse articles
async function track_tag(config: Config) {
    let user = users[3];
    await Service.login(config, user[0], user[1]);

    await Service.list_article_for_user(config).then((articles) => {
        for (let article of articles) {
            console.log(article);
        }
    });

    await Service.follow_tag(config, tags[0]);
    await Service.follow_tag(config, tags[4]);
    await Service.list_article_for_user(config).then((articles) => {
        for (let article of articles) {
            console.log(article);
        }
    });

    await Service.unfollow_tag(config, tags[0]);
    await Service.list_article_for_user(config).then((articles) => {
        for (let article of articles) {
            console.log(article);
        }
    });
}

// app behavior
// admin query
// list user & article & tag
async function admin_query(config: Config) {
    await Service.list_user(config).then((users) => {
        for (let user of users) {
            console.log(user);
        }
    });

    await Service.list_article(config).then((articles) => {
        for (let article of articles) {
            console.log(article);
        }
    });

    await Service.list_tag(config).then((tags) => {
        for (let tag of tags) {
            console.log(tag);
        }
    });
}

app_init().then((config) => {
    track_article(config).then(() => {
        track_tag(config).then(() => {
            admin_query(config);
        })
    });

}).catch((reason) => {
    console.log(reason);
});

// let config = {
//     app_name: 'kobe_kokko-v0.0.6',
//     endpoint: 'http://202.120.40.82:11233',
//     fullpath: '/home/snoopy/Documents/koke-kokko/dist/proto/koke_kokko.proto',
//     filename: 'koke_kokko.proto',
//     version: 'v0.0.1',
//     app_id: '3fccb851-0f4b-4146-b7c2-b8240cb9b24c'
// } as Config;

// // track_tag(config);

// admin_query(config);
