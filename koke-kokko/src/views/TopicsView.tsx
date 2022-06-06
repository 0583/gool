import React, {useEffect} from 'react';
import { Box, Divider, List, Stack, Tab, Tabs, Typography } from "@mui/material";
import TopicItem from "../widgets/TopicItem";
import {
    Article,
    AssuredWorkload, DirectionsRun,
    HealthAndSafety, Mic,
    Newspaper,
    PhoneAndroid, TrendingUp,
} from "@mui/icons-material";
import {SnackBarSenderProps} from "../App";
import {Config, Service} from "../services/service";
import {LocalStoreConfig} from "../widgets/ConifgLocalstorageUtil";
import {Schema} from "../services/schema/schema";

function TopicsView(props: SnackBarSenderProps) {
    const [panelIndex, setPanelIndex] = React.useState<number>(0);
    const [tagsList, setTagsList] = React.useState<string[]>([]);
    const [activeKokkos, setActiveKokkos] = React.useState<Schema.Article[]>([]);

    useEffect(() => {
        // refreshKokko()
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

    return (
        <Box marginTop={-2}>
            <Stack>
                <Tabs aria-label="basic tabs example" value={panelIndex} onChange={handleChange} centered>
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
                                    kokkoCount={Math.random() * 400}
                                    viewCount={Math.random() * 900}
                                    image={kokko.article_photo[0]}
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
    )
}

export default TopicsView;