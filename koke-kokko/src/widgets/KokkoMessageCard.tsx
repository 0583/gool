import React, {useEffect} from "react";
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
import {LocalStoreConfig} from "./ConifgLocalstorageUtil";
import {Schema} from "../services/schema/schema";
import {Service} from "../services/service";

interface KokkoMessageCardProps {
    articleId: string,
    username: string,
    avatar: string,
    date: string,
    content: string,
    image?: string[],
    showActions: boolean,
}

function KokkoMessageCard(props: KokkoMessageCardProps) {

    const [isLiked, setIsLiked] = React.useState<boolean>(false)

    useEffect(() => {
        refreshIsLiked()
    }, [])

    function refreshIsLiked() {
        setIsLiked(LocalStoreConfig.get_config()?.user.bookmark_article_arr.includes(props.articleId) ?? false)
    }

    return (
        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
            <CardHeader
                avatar={<Avatar src={'/api/image?uuid=' + props.avatar} />}
                title={props.username}
                subheader={props.date}
            />
            <Divider />
            <CardContent>
                {renderTypographyWithTags(props.content)}
            </CardContent>
            { (props.image === undefined || props.image.length === 0) ||
                <ImageList variant='masonry' sx={{ margin: 2 }}>
                    {
                        props.image!.map((imageUuid) => {
                            return <ImageListItem key={imageUuid}>
                                <Card elevation={2} sx={{ width: '100%' }}>
                                    <img width='100%' src={'/api/image?uuid=' + imageUuid}/>
                                </Card>
                            </ImageListItem>
                        })
                    }
                </ImageList>
            }
            {props.showActions &&
                <CardActions disableSpacing>
                    <IconButton color={isLiked ? "error" : "default"} aria-label="add to favorites" onClick={
                        (e) => {
                            if (isLiked) {
                                // 已经 like 过了，取消 like
                                Service.unmark_article(LocalStoreConfig.get_config()!, props.articleId).then(() => {
                                    refreshIsLiked()
                                })
                            } else {
                                // 没 like 过，like 一下
                                Service.mark_article(LocalStoreConfig.get_config()!, props.articleId).then(() => {
                                    refreshIsLiked()
                                })
                            }
                        }
                    }>
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share" onClick={
                        (e) => {

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