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
        Service.list_tag(LocalStoreConfig.get_config() ?? new Config()).then(
            (tags) => {
                setTagsList(tags.map((e) => { return e.tagname }))
            }
        ).catch(() => {
            setTagsList([])
        })
    }, [])

    useEffect(() => {
        // refreshActiveKokkos
        setActiveKokkos([]);

    }, [panelIndex])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPanelIndex(newValue);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        category: string;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, category, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={panelIndex !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Divider sx={{ marginX: -2 }} />
                {panelIndex === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
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
                {
                    activeKokkos.map(( kokko, index ) => {
                        return (
                            <TabPanel category={index.toString()} index={index}>
                                <List sx={{ marginTop: 1 }}>
                                    <TopicItem
                                        topicName="新型コロナウイルスワクチンの基本情報"
                                        category="COVID-19 · LIVE"
                                        kokkoCount={8246}
                                        viewCount={194811}
                                        image="topics/covid.jpeg"
                                    />
                                    <TopicItem
                                        topicName="Lavrov"
                                        category="Trending in Politics"
                                        kokkoCount={1605}
                                        viewCount={82609}
                                    />
                                    <TopicItem
                                        topicName="ロシア外務省 日本大使館の外交官ら8人追放へ"
                                        category="World News · LIVE"
                                        kokkoCount={8246}
                                        viewCount={19645}
                                        image="topics/moscow.png"
                                    />
                                    <TopicItem
                                        topicName="最高裁の判決が「，」から「、」に変更したワケ"
                                        category="News · LIVE"
                                        kokkoCount={9180}
                                        viewCount={29273}
                                    />
                                    <TopicItem
                                        topicName="低所得子育て世帯に5万円給付 6月以降に 厚労省"
                                        category="News · LIVE"
                                        kokkoCount={555}
                                        viewCount={61104}
                                    />
                                </List>
                                <Divider sx={{ fontSize: 13, color: 'gray', marginX: -2 }}>5 Topics</Divider>
                            </TabPanel>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

export default TopicsView;