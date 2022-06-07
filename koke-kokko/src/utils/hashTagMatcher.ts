import {Schema} from "../services/schema/schema";
import {Config} from "../services/service";

export function isArticleHit(config: Config, article: Schema.Article): boolean {
    // console.log('check if hit: ', config.user.follow_tag_arr, article.related_tag_arr)
    for (const tag of article.related_tag_arr) {
        if (config.user.follow_tag_arr.includes(tag)) {
            return true
        }
    }
    return false
}