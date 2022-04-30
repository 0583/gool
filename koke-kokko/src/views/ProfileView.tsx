import {
    AccordionDetails,
    AccordionSummary,
    Avatar, Box,
    Card, CardActions,
    CardContent,
    CardHeader, CardMedia,
    Grid, IconButton, Link, List,
    ListItem,
    Typography
} from "@mui/material";
import {ExpandMore, Favorite, Share} from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import React from "react";
import KokkoMessageCard from "../widgets/KokkoMessageCard";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

function ProfileView() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <List>
                    <ListItem>
                        <Typography variant="h4">
                            Your Kokkos
                        </Typography>
                    </ListItem>
                    <ListItem key="my_kokko_1">
                        <KokkoMessageCard
                            username="YU Xiqian"
                            avatar="avatars/xiqyu.png"
                            date="April 28, 2022"
                            content={
                                <Typography variant="body1">
                                    can't believe what i've just seen...
                                </Typography>
                            }
                            showActions={false}/>
                    </ListItem>
                    <ListItem key="my_kokko_2">
                        <KokkoMessageCard
                            username="YU Xiqian"
                            avatar="avatars/xiqyu.png"
                            date="April 21, 2022"
                            content={
                                <Typography variant="body1">
                                    The worst day ever.
                                </Typography>
                            }
                            showActions={false}/>
                    </ListItem>
                    <ListItem key="my_kokko_3">
                        <KokkoMessageCard
                            username="YU Xiqian"
                            avatar="avatars/xiqyu.png"
                            date="March 3, 2022"
                            content={
                                <Typography variant="body1">
                                    Why? Why? Why?
                                </Typography>
                            }
                            showActions={false}/>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={5}>
                <Box margin={2}>
                    <Typography variant="h4" marginBottom={2}>
                        Personal Info
                    </Typography>
                    <Accordion variant="outlined">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion variant="outlined">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion variant="outlined">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Disabled Accordion</Typography>
                        </AccordionSummary>
                    </Accordion>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProfileView;