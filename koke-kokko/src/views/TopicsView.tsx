import React, {useEffect} from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    SpeedDial,
    Stack,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import TopicItem from "../widgets/TopicItem";
import {
    Add,
    Article,
    AssuredWorkload, DirectionsRun, Favorite, FavoriteOutlined,
    HealthAndSafety, Info, Mic,
    Newspaper,
    PhoneAndroid, Remove, TrendingUp,
} from "@mui/icons-material";
import {SnackBarSenderProps} from "../App";
import {Config, Service} from "../services/service";
import {LocalStoreConfig} from "../widgets/ConifgLocalstorageUtil";
import {Schema} from "../services/schema/schema";
import KokkoMessageCard from "../widgets/KokkoMessageCard";

function TopicsView(props: SnackBarSenderProps) {
    const [panelIndex, setPanelIndex] = React.useState<number>(0);
    const [tagsList, setTagsList] = React.useState<string[]>([]);
    const [activeKokkos, setActiveKokkos] = React.useState<Schema.Article[]>([]);
    const [followingTags, setFollowingTags] = React.useState<string[]>([]);
    const [isFollowing, setIsFollowing] = React.useState<boolean>(false);

    const refreshFollowingTags = () => {
        setFollowingTags(LocalStoreConfig.get_config()?.user?.follow_tag_arr?.splice(0) ?? []);
    }

    useEffect(() => {
        setIsFollowing(followingTags.includes(tagsList[panelIndex]))
    }, [tagsList, panelIndex, followingTags])

    useEffect(() => {
        refreshFollowingTags()
        Service.list_tag(LocalStoreConfig.get_config()!).then(
            (tags) => {
                setTagsList(tags.map((e) => { return e.tagname }))
            }
        ).catch(() => {
            setTagsList([])
        })
    }, [])

    useEffect(() => {
        if (tagsList[panelIndex]) {
            // refreshActiveKokkos
            setActiveKokkos([]);
            Service.list_article_for_tag(LocalStoreConfig.get_config()!, tagsList[panelIndex]).then((articles) => {
                setActiveKokkos(articles.splice(0));
            })
        }
    }, [panelIndex, tagsList])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPanelIndex(newValue);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        category: string;
    }

    const [activeKokko, setActiveKokko] = React.useState<Schema.Article | undefined>();
    return (
        <div>
            <Dialog open={activeKokko !== undefined} onClose={() => { setActiveKokko(undefined) }}>
                {activeKokko === undefined ||
                    <>
                    <DialogTitle>
                    Kokko from {activeKokko!.author}
                    </DialogTitle>
                    <DialogContent>
                    <KokkoMessageCard username={activeKokko!.author}
                    avatar={activeKokko!.user_photo}
                    date={activeKokko!.post_time}
                    content={activeKokko!.content}
                    image={activeKokko.article_photo}
                    showActions={true}/>
                    </DialogContent>
                    </>
                }
            </Dialog>
            <SpeedDial ariaLabel={"Favorite Topics"}
                       sx={{ position: 'absolute', top: 64, right: 16 }}
                       // FabProps={{
                       //     sx: {
                       //         bgcolor: 'pink',
                       //         '&:hover': {
                       //             bgcolor: 'pink',
                       //         }
                       //     }
                       // }}
                       icon={isFollowing ? <Remove /> : <Add/>}
                       onClick={() => {
                           if (isFollowing) {
                               Service.unfollow_tag(LocalStoreConfig.get_config()!, tagsList[panelIndex]).then(() => {
                                   refreshFollowingTags()
                                   props.sender("Successfully unfollowed tag.")
                               }).catch(() => {
                                   props.sender("Failed to unfollow this tag.")
                               })
                           } else {
                               Service.follow_tag(LocalStoreConfig.get_config()!, tagsList[panelIndex]).then(() => {
                                   refreshFollowingTags()
                                   props.sender("Successfully followed tag.")
                               }).catch(() => {
                                   props.sender("Failed to follow this tag.")
                               })
                           }
                       }}
            />
            <Box marginTop={-2}>
                <Stack>
                    <Tabs aria-label="basic tabs example" value={panelIndex} onChange={handleChange}
                          variant="scrollable"
                          scrollButtons="auto">
                        {
                            tagsList.map(( name, index ) => {
                                return (<Tab key={index} label={'#' + name} />);
                            })
                        }
                    </Tabs>
                    <List sx={{ marginTop: 1 }}>
                        {
                            activeKokkos.map((kokko, index) => {
                                return (
                                    <TopicItem
                                        key={index.toString()}
                                        topicName={kokko.content}
                                        category=""
                                        author={kokko.author}
                                        time={kokko.post_time}
                                        image={kokko.article_photo[0]}
                                        onClick={() => { setActiveKokko(kokko) }}
                                    />
                                )
                            })
                        }
                    </List>
                    {
                        activeKokkos.length > 0 && <Divider sx={{ fontSize: 13, color: 'gray', marginX: -2 }}>{activeKokkos.length} Topics</Divider>
                    }
                </Stack>
            </Box>
        </div>
    )
}

export default TopicsView;