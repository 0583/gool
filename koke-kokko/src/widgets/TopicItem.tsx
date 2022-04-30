import React from "react";
import {Avatar, ListItem, Stack, Typography} from "@mui/material";

interface TopicItemProps {
    topicName: string,
    category: string,
    kokkoCount: number,
    image?: string
}

function TopicItem(props: TopicItemProps) {
    return (
        <ListItem>
            <Stack sx={{ width: '100%' }} direction="row" alignItems="center" justifyContent="space-between">
                <Stack justifyContent="flex-start">
                    <Typography variant="body2">
                        {props.category}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        #{props.topicName}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {props.kokkoCount} kokkos
                    </Typography>
                </Stack>
                {props.image && <Avatar variant="rounded" sx={{ width: 64, height: 64 }} src={props.image}/>}
            </Stack>
        </ListItem>
    );
}
export default TopicItem;