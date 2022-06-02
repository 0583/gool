import React from 'react';
import {
    Avatar,
    AvatarGroup, Box,
    Chip,
    Divider,
    Grid,
    IconButton,
    Link,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import { Edit, Tag } from "@mui/icons-material";
import KokkoMessageCard from "../widgets/KokkoMessageCard";
import {SnackBarSenderProps} from "../App";

function BookmarksView(props: SnackBarSenderProps) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box margin={2}>
                    <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
                            <Typography variant="h4">
                                Pinned Kokkos
                            </Typography>
                            <IconButton>
                                <Edit />
                            </IconButton>
                        </Stack>
                        <KokkoMessageCard
                            username="YUAN Zhuo"
                            avatar="avatars/yzhuo.png"
                            date="April 13, 2022"
                            content={
                                <Typography variant="body1">
                                    The adorable pink hero <Link href="#">#Kirby</Link> made his debut in Kirby's Dream Land on Game Boy in Japan 30 years ago today! What is your favorite Kirby memory?
                                </Typography>
                            }
                            image="examples/FRXaiWUWUAIMXEO.jpeg"
                            isLiked={true}
                            showActions={true}
                        />
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1} margin={1}>
                    <ListItem>
                        <Stack spacing={1}>
                            <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h4">
                                    Pinned Topics
                                </Typography>
                                <IconButton>
                                    <Edit />
                                </IconButton>
                            </Stack>
                            <Stack spacing={1} direction="column" alignItems="flex-start">
                                <Typography variant="h6" color="text.secondary">
                                    4 Topics
                                </Typography>
                                <Chip variant="outlined"
                                    icon={<Tag />}
                                    label="#iPhone3GS"
                                    onClick={() => { }}
                                />
                                <Chip variant="outlined"
                                    icon={<Tag />}
                                    label="#Picasso"
                                    onClick={() => { }}
                                />
                                <Chip variant="outlined"
                                    icon={<Tag />}
                                    label="#LDR"
                                    onClick={() => { }}
                                />
                                <Chip variant="outlined"
                                    icon={<Tag />}
                                    label="#Yemen"
                                    onClick={() => { }}
                                />
                            </Stack>
                        </Stack>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                Following
                            </Typography>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Typography variant="h6" color="text.secondary">
                                    24 People
                                </Typography>
                                <AvatarGroup total={24}>
                                    <Avatar src="avatars/ianhui.png" />
                                    <Avatar src="avatars/71575353.png" />
                                    <Avatar src="avatars/74477599.png" />
                                    <Avatar src="avatars/Ryoushimabara.png" />
                                </AvatarGroup>
                            </Stack>
                        </Stack>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                Followers
                            </Typography>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Typography variant="h6" color="text.secondary">
                                    3 People
                                </Typography>
                                <AvatarGroup total={3}>
                                    <Avatar src="avatars/yzhuo.png" />
                                    <Avatar src="avatars/ianhui.png" />
                                    <Avatar src="avatars/picasso.png" />
                                </AvatarGroup>
                            </Stack>
                        </Stack>
                    </ListItem>
                    <Divider />
                </Stack>
            </Grid>
        </Grid>
    )
}

export default BookmarksView;