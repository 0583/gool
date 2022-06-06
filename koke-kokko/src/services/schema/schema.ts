
export namespace Schema {
    export interface User {
        email: string;
        username: string;
        password: string;
        profile_photo: string;
        follow_tag_arr: string[];
        published_article_arr: string[];
        bookmark_article_arr: string[];
    };
    export interface Article {
        article_id: string;
        email: string;
        author: string;
        user_photo: string;
        location: string;
        article_photo: string[];
        content: string;
        post_time: string;
        related_tag_arr: string[];
    }
    export interface Tag {
        tagname: string;
        article_arr: string[];
    }
};




