import {
    AccordionDetails,
    AccordionSummary,
    Box, Button,
    CardMedia, Divider,
    Grid, IconButton, List,
    ListItem, Stack,
    Typography
} from "@mui/material";
import { Edit, ExpandMore } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import React from "react";
import KokkoMessageCard from "../widgets/KokkoMessageCard";
import {SnackBarSenderProps} from "../App";

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

function getProperties(itemName: string, content: string, description: string) {
    return (<Accordion variant="outlined">
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography sx={{ width: "33%" }} fontWeight="bold">{itemName}</Typography>
            <Typography sx={{ color: "text.secondary" }}>{content}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                {description}
            </Typography>
        </AccordionDetails>
    </Accordion>);
}

function ProfileView(props: SnackBarSenderProps) {
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
                            showActions={false} />
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
                            showActions={false} />
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
                            showActions={false} />
                    </ListItem>
                    <Divider sx={{ margin: 2, fontSize: 13, color: 'gray' }}>3 Kokkos</Divider>
                </List>
            </Grid>
            <Grid item xs={5}>
                <Box margin={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
                        <Typography variant="h4">
                            Personal Info
                        </Typography>
                        <IconButton>
                            <Edit />
                        </IconButton>
                    </Stack>

                    <Accordion variant="outlined">
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography fontWeight="bold">Avatar</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CardMedia
                                component="img"
                                image="avatars/xiqyu.png"
                            />
                        </AccordionDetails>
                    </Accordion>
                    {(
                        getProperties("First Name", "Xiqian", "A given name (also known as a forename or first name) is the part of a personal name that identifies a person, potentially with a middle name as well, and differentiates that person from the other members of a group (typically a family or clan) who have a common surname.")
                    )}

                    {(
                        getProperties("Last Name", "YU", "Surname, family name, or last name is the portion of one's personal name that indicates one's family, tribe or community.")
                    )}

                    {(
                        getProperties("Gender", "Not presented", "Gender is the range of characteristics pertaining to femininity and masculinity and differentiating between them. Depending on the context, this may include sex-based social structures (i.e. gender roles) and gender identity.")
                    )}

                    {(
                        getProperties("Location", "Asia/Shanghai", "In geography, location or place are used to denote a region (point, line, or area) on Earth's surface or elsewhere.")
                    )}

                    {(
                        getProperties("Time Zone", "GMT+08:00", "A time zone is an area that observes a uniform standard time for legal, commercial and social purposes. Time zones tend to follow the boundaries between countries and their subdivisions instead of strictly following longitude, because it is convenient for areas in frequent communication to keep the same time.")
                    )}
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button sx={{ marginLeft: 2 }}>
                        Export All
                    </Button>

                    <Button sx={{ marginLeft: 2 }} variant="outlined" color="error">
                        Delete Account
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default ProfileView;