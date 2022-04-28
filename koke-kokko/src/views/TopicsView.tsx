import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";

function TopicsView() {
    const [panelIndex, setPanelIndex] = React.useState<number>(0);

    const [topicTypes, setTopicTypes] = React.useState<string[]>(["Sports", "Health", "News", "Entertainment", "Technology", "Politics"]);

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
            </div>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs aria-label="basic tabs example" value={panelIndex} onChange={handleChange} centered>
                    {
                        topicTypes.map((value) => {
                            return (<Tab label={value} />);
                        })
                    }
                </Tabs>
                {
                    topicTypes.map((category, index) => {
                        return (
                            <TabPanel category={category} index={index} key={index}>
                                <Typography variant="h2">Item #{index}</Typography>
                                <Typography variant="h5">{category}</Typography>
                            </TabPanel>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default TopicsView;