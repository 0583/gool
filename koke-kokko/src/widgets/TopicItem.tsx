import React from "react";
import { Avatar, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import {AlternateEmail, ChatBubbleOutline, Visibility} from "@mui/icons-material";

interface TopicItemProps {
    topicName: string,
    category: string,
    author: string,
    image?: string
}

function TopicItem(props: TopicItemProps) {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <Stack sx={{ width: '100%' }} direction="row" alignItems="center" justifyContent="space-between" margin={1}>
                    <Stack justifyContent="flex-start">
                        <Typography variant="body2">
                            {props.category}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {props.topicName}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AlternateEmail sx={{ fontSize: 17, color: "darkslategray" }} />
                            <Typography variant="body2" color="darkslategray">
                                {props.author}
                            </Typography>
                        </Stack>
                    </Stack>
                    {props.image && <Avatar variant="rounded" sx={{ width: 64, height: 64 }} src={"/api/image?uuid=" + props.image} />}
                </Stack>
            </ListItemButton>
        </ListItem>
    );
}
export default TopicItem;