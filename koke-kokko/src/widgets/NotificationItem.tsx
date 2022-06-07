import React from "react";
import {Avatar, ListItem, Typography, ListItemAvatar, ListItemText, Stack, Chip} from "@mui/material";
import {PinDrop, Tag} from "@mui/icons-material";


interface NotificationItemProps {
    Username: string,
    UserAvatar: any,
    NoticeContext: string[],
    Time: string,
    NewsAva: any,
    NewsText: string
}

function NotificationItem(props: NotificationItemProps) {

    // const [newscontext , setNewscontext] = React.useState<boolean>(true);
    // if(props.NewsAva == ""){
    //     setNewscontext(false)
    // }
    return (

        <ListItem alignItems="flex-start" divider={true}>
            <ListItemAvatar>
                <Avatar src={"/api/image?uuid=" + props.UserAvatar} />
            </ListItemAvatar>
            <ListItemText
                primary={<React.Fragment>
                <Stack direction="row" spacing={1}>
                    <Typography sx={{ fontWeight: 500, fontStyle: 'normal' }} display={"inline-block"}>
                        {props.Username} Posted a Kokko
                    </Typography>
                    {/*<Typography sx={{ fontSize: 15, marginLeft: 1 }} display={"inline-block"} >{"   " + props.NoticeContext}</Typography>*/}
                    <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                        {props.NoticeContext.map((tagName) => {
                              return <Chip
                                icon={<Tag />}
                                size="small"
                                label={tagName}
                                variant="outlined"
                                />
                            })
                        }
                    </Stack>
                </Stack>
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
                <Avatar src={"/api/image?uuid=" + props.NewsAva} variant="square" sx={{ width: 56, height: 56 }} />
            </ListItemAvatar>
        </ListItem>
    )
}

export default NotificationItem;