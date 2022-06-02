import React from "react";
import { Avatar, Card, ListItem, Stack, Typography, ListItemAvatar, ListItemText } from "@mui/material";


interface NotificationItemProps {
    Username: string,
    UserAvatar: any,
    NoticeContext: string,
    Time: string,
    NewsAva: any,
    NewsText: string
}

function NotificationItem(props: NotificationItemProps) {

    // const [newscontext , setNewscontext] = React.useState<boolean>(true);
    // if(props.NewsAva == ""){
    //     setNewscontext(false)
    // }

    let ShowPicOrText = (props.NewsAva === '') ?
        <Typography sx={{
            width: 56, height: 56,
            wordBreak: "break-all",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            fontSize: 1, lineHeight: 1.5, fontStyle: 'italic',
        }}>{props.NewsText} </Typography> : <Avatar alt="Remy Sharp" src={props.NewsAva} variant="square" sx={{ width: 56, height: 56 }} />
    return (

        <ListItem alignItems="flex-start" divider={true}>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={props.UserAvatar} />
            </ListItemAvatar>
            <ListItemText
                primary={<React.Fragment>

                    <Typography sx={{ fontWeight: 500, fontStyle: 'normal' }} display={"inline-block"}>
                        {props.Username}
                    </Typography>
                    <Typography sx={{ fontSize: 15, marginLeft: 1 }} display={"inline-block"} >{"   " + props.NoticeContext}</Typography>

                </React.Fragment>}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.Time}
                        </Typography>
                    </React.Fragment>
                }
            />
            <ListItemAvatar sx={{ position: 'right', width: 56, height: 56 }}>
                {ShowPicOrText}
            </ListItemAvatar>
        </ListItem>
    )
}

export default NotificationItem;