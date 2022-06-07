import {
    Divider,
    Grid,
    List,
} from "@mui/material";
import React, {useEffect} from "react";
import NotificationItem from "../widgets/NotificationItem";
import {ArticleTransferProps, SnackBarSenderProps} from "../App";
import {Box} from "@mui/system";
import {Schema} from "../services/schema/schema";
import {Service} from "../services/service";
import {isArticleHit} from "../utils/hashTagMatcher";
import {LocalStoreConfig} from "../widgets/ConifgLocalstorageUtil";

function NotificationsView(props: SnackBarSenderProps & ArticleTransferProps) {

    const [newKokkos, setNewKokkos] = React.useState<Schema.Article[]>([])

    useEffect(() => {
        const config = LocalStoreConfig.get_config()!
        Service.list_article(config).then(
            (latestArticles) => {
                console.log(latestArticles, props.articles)
                setNewKokkos(latestArticles.filter((article) => {
                    return isArticleHit(config, article) && !props.articles.some(item => item.article_id === article.article_id)
                }))
            }
        )
    }, [])

    const notificationItems = [
        {
            Username: 'xujiahao',
            UserAvatar: 'avatars/ianhui.png',
            NoticeContext: "like your News",
            Time: "April 30th",
            NewsAva: 'examples/V2oHe4a4.jpeg',
            NewsText: 'Thanks to the Bipartisan Infrastructure Law, we’re going to start replacing 100% of the lead pipes and water lines that go into homes and schools in this country.\n' +
                '\n' +
                'Every American, every child, should be able to turn on a faucet and drink water that’s clean.'
        },
        {
            Username: 'Yzhuo',
            UserAvatar: 'avatars/yzhuo.png',
            NoticeContext: "like your News",
            Time: "April 30th",
            NewsAva: '',
            NewsText: 'can\'t believe what i\'ve just seen...'
        },
        {
            Username: 'xiqyu',
            UserAvatar: 'avatars/xiqyu.png',
            NoticeContext: "like your News",
            Time: "April 30th",
            NewsAva: '',
            NewsText: '\'Thanks to the Bipartisan Infrastructure Law, we’re going to start replacing 100% of the lead pipes and water lines that go into homes and schools in this country.\\n\' +\n' +
                '                \'\\n\' +\n' +
                '                \'Every American, every child, should be able to turn on a faucet and drink water that’s clean.\''
        }
    ]

    return (
        <Box>
            <List sx={{ bgcolor: 'background.paper' }}>
                {
                    newKokkos.map((kokko) => {
                        return (<NotificationItem key={kokko.article_id}
                                                  Username={kokko.author}
                                                  UserAvatar={kokko.user_photo}
                                                  NoticeContext={kokko.related_tag_arr}
                                                  Time={kokko.post_time}
                                                  NewsAva={kokko.article_photo[0]}
                                                  NewsText={kokko.content}
                        />);
                    })
                }
            </List>
            {newKokkos.length === 0 &&
                <Divider sx={{margin: 2, fontSize: 13, color: 'gray'}}>No New Notifications</Divider>
            }
        </Box>
    )
}

export default NotificationsView;