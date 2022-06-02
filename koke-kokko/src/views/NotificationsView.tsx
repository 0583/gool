import {
    Grid,
    List,
} from "@mui/material";
import React from "react";
import NotificationItem from "../widgets/NotificationItem";
import {SnackBarSenderProps} from "../App";

function NotificationsView(props: SnackBarSenderProps) {

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
        <Grid container justifyContent={"center"}  >
            <Grid item >
                <List sx={{ width: 800, bgcolor: 'background.paper' }}>
                    {
                        notificationItems.map(({ Username, UserAvatar, NoticeContext, Time, NewsAva, NewsText }, index) => {
                            return (<NotificationItem key={index}
                                Username={Username}
                                UserAvatar={UserAvatar}
                                NoticeContext={NoticeContext}
                                Time={Time}
                                NewsAva={NewsAva}
                                NewsText={NewsText}
                            />);
                        })
                    }
                </List>
            </Grid>
        </Grid>
    )
}

export default NotificationsView;