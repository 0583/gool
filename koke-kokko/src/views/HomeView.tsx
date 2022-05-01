import {
    Button,
    Card, CardActions, CardContent,
    CardMedia, Chip,
    Grid,
    InputAdornment, Link,
    List, ListItem, Menu, MenuItem,
    Stack,
    TextField, Typography
} from "@mui/material";
import {Photo, PinDrop, Search, Tag} from "@mui/icons-material";
import React from "react";
import KokkoMessageCard from "../widgets/KokkoMessageCard";

function HomeView() {
    const [kokkoText, setKokkoText] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [visibility, setVisibility] = React.useState<string>('Public');

    function closeEvent(visibility: string) {
        return () => {
            setVisibility(visibility);
            handleClose();
        }
    }

    const visibilityMenuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container>
            <Grid item xs={7}>
                <List sx={{ height: '100%' }}>
                    <ListItem key="send_kokko">
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <TextField
                                inputProps={{ maxLength: 140 }}
                                id="outlined-textarea"
                                label="What's happening?"
                                placeholder="Input here"
                                value={kokkoText}
                                onChange={(e) => {setKokkoText(e.target.value)}}
                                helperText={kokkoText ? kokkoText.length.toString() + " / 140" : undefined}
                                multiline
                            />
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                                    <Chip
                                        icon={<Photo/>}
                                        size="small"
                                        label="Image"
                                        variant="outlined"
                                    />
                                    <Chip
                                        icon={<Tag/>}
                                        size="small"
                                        label="Topic"
                                        variant="outlined"
                                    />
                                    <Chip
                                        icon={<PinDrop/>}
                                        size="small"
                                        label="Location"
                                        variant="outlined"
                                    />
                                    <Button
                                        size="small"
                                        id="basic-button"
                                        aria-controls={visibilityMenuOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={visibilityMenuOpen ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Visibility: {visibility}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={visibilityMenuOpen}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={closeEvent("Public")} selected={ visibility === "Public" }>
                                            <Stack>
                                                <Typography fontWeight={visibility === "Public" ? "bold" : "normal"}>Public</Typography>
                                                <Typography variant="body2" color="gray">Every Koke-kokko user could see this post.</Typography>
                                            </Stack>
                                        </MenuItem>
                                        <MenuItem onClick={closeEvent("Followers")} selected={ visibility === "Followers" }>
                                            <Stack>
                                                <Typography fontWeight={visibility === "Followers" ? "bold" : "normal"}>Followers</Typography>
                                                <Typography variant="body2" color="gray">People you're following could see this post.</Typography>
                                            </Stack>
                                        </MenuItem>
                                        <MenuItem onClick={closeEvent("Private")} selected={ visibility === "Private" }>
                                            <Stack>
                                                <Typography fontWeight={visibility === "Private" ? "bold" : "normal"}>Private</Typography>
                                                <Typography variant="body2" color="gray">Only yourself can see this post.</Typography>
                                            </Stack>
                                        </MenuItem>
                                    </Menu>
                                </Stack>
                                <Stack spacing={1} direction="row" justifyContent="flex-end">
                                    <Button size="small" variant="outlined">Post</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </ListItem>

                    <ListItem key="kokko_1">
                        <KokkoMessageCard
                            username="XU Jiahao"
                            avatar="avatars/ianhui.png"
                            date="April 28, 2022"
                            content={
                                <>
                                    <Typography variant="body1">
                                        Thanks to the Bipartisan Infrastructure Law, we’re going to start replacing 100% of the lead pipes and water lines that go into homes and schools in this country.
                                    </Typography>
                                    <Typography variant="body1">
                                        Every American, every child, should be able to turn on a faucet and drink water that’s clean.
                                    </Typography>
                                </>
                            }
                            showActions={true}
                        />
                    </ListItem>

                    <ListItem key="kokko_2">
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
                    </ListItem>

                    <ListItem key="kokko_3">
                        <KokkoMessageCard
                            username="YU Xiqian"
                            avatar="avatars/xiqyu.png"
                            date="April 28, 2022"
                            content={
                                <Typography variant="body1">
                                    can't believe what i've just seen...
                                </Typography>
                            }
                            showActions={true}
                        />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={5}>
                <List>
                    <ListItem key="search">
                        <TextField
                            sx={{ width: '100%' }}
                            id="input-with-icon-textfield"
                            label="Search Koke-kokko"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </ListItem>
                    <ListItem key="news_1">
                        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
                            <CardMedia
                                component="img"
                                image="examples/lN4Qc82z.png"
                                alt="News Image 1"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    News · Politics
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ロシア外務省 日本大使館の外交官ら8人追放へ
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                    <ListItem key="news_2">
                        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
                            <CardMedia
                                component="img"
                                image="examples/V2oHe4a4.jpeg"
                                alt="News Image 2"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    News · LIVE
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    運航会社社長が会見で謝罪 知床観光船事故
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}

export default HomeView;