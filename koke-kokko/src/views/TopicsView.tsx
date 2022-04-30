import React from 'react';
import {Box, List, Tab, Tabs, Typography} from "@mui/material";
import TopicItem from "../widgets/TopicItem";
import {
    AssuredWorkload, DirectionsRun,
    HealthAndSafety, Mic,
    Newspaper,
    PhoneAndroid,
} from "@mui/icons-material";

function TopicsView() {
    const [panelIndex, setPanelIndex] = React.useState<number>(0);

    const topicTypes = [
        {
            "key": 0,
            "name": "Sports",
            "icon": (<DirectionsRun/>)
        },
        {
            "key": 1,
            "name": "Health",
            "icon": (<HealthAndSafety/>)
        },
        {
            "key": 2,
            "name": "News",
            "icon": (<Newspaper/>)
        },
        {
            "key": 3,
            "name": "Entertainment",
            "icon": (<Mic/>)
        },
        {
            "key": 4,
            "name": "Technology",
            "icon": (<PhoneAndroid/>)
        },
        {
            "key": 5,
            "name": "Politics",
            "icon": (<AssuredWorkload/>)
        }
    ]

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
                {panelIndex === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
                <List>
                    <TopicItem
                        topicName="新型コロナウイルスワクチンの基本情報"
                        category="COVID-19 · LIVE"
                        kokkoCount={8246}
                        image="topics/covid.jpeg"
                    />
                    <TopicItem
                        topicName="Lavrov"
                        category="Trending in Politics"
                        kokkoCount={1605}
                    />
                    <TopicItem
                        topicName="ロシア外務省 日本大使館の外交官ら8人追放へ"
                        category="World News · LIVE"
                        kokkoCount={8246}
                        image="topics/moscow.png"
                    />
                    <TopicItem
                        topicName="最高裁の判決が「，」から「、」に変更したワケ"
                        category="News · LIVE"
                        kokkoCount={9180}
                    />
                    <TopicItem
                        topicName="低所得子育て世帯に5万円給付 6月以降に 厚労省"
                        category="News · LIVE"
                        kokkoCount={555}
                    />
                </List>
            </div>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs aria-label="basic tabs example" value={panelIndex} onChange={handleChange} centered>
                    {
                        topicTypes.map(({icon, key, name}) => {
                            return (<Tab key={key} icon={icon} aria-label={name} />);
                        })
                    }
                </Tabs>
                {
                    topicTypes.map(({icon, key, name}) => {
                        return (
                            <TabPanel category={name} index={key}>
                                <Typography variant="h2">{name}</Typography>
                            </TabPanel>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default TopicsView;