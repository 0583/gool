import React from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Divider,
    IconButton, ImageList, ImageListItem,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";
import {renderTypographyWithTags} from "../utils/hashTagParser";

interface KokkoMessageCardProps {
    username: string,
    avatar: string,
    date: string,
    content: string,
    image?: string[],
    showActions: boolean,
    isLiked?: boolean,
    onLikeButtonClicked?: (props: KokkoMessageCardProps) => void,
    onShareButtonClicked?: (props: KokkoMessageCardProps) => void
}

function KokkoMessageCard(props: KokkoMessageCardProps) {
    return (
        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
            <CardHeader
                avatar={<Avatar src={props.avatar} />}
                title={props.username}
                subheader={props.date}
            />
            <Divider />
            <CardContent>
                {renderTypographyWithTags(props.content)}
            </CardContent>
            <ImageList variant='masonry' sx={{ margin: 2 }}>
                { props.image === undefined ||
                    props.image!.map((imageUuid) => {
                        return <ImageListItem key={imageUuid}>
                            <Card elevation={2} sx={{ width: '100%' }}>
                                <img width='100%' src={'/api/image?uuid=' + imageUuid}/>
                            </Card>
                        </ImageListItem>
                    })
                }
            </ImageList>
            {props.showActions &&
                <CardActions disableSpacing>
                    <IconButton color={props.isLiked === true ? "error" : "default"} aria-label="add to favorites" onClick={
                        (e) => {
                            if (props.onLikeButtonClicked) {
                                props.onLikeButtonClicked(props);
                            }
                        }
                    }>
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share" onClick={
                        (e) => {
                            if (props.onShareButtonClicked) {
                                props.onShareButtonClicked(props);
                            }
                        }
                    }>
                        <Share />
                    </IconButton>
                </CardActions>
            }
        </Card>
    );
}

export default KokkoMessageCard;