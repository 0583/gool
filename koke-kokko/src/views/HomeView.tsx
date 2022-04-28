import {
    Avatar,
    Button,
    Card, CardActions, CardContent, CardHeader,
    CardMedia,
    FormControlLabel,
    Grid, IconButton,
    InputAdornment, Link,
    List, ListItem,
    Stack,
    Switch,
    TextField, Typography
} from "@mui/material";
import {Favorite, Search, Share} from "@mui/icons-material";

function HomeView() {
    return (
        <Grid container>
            <Grid item xs={7}>
                <List sx={{ height: '100%' }}>
                    <ListItem key="send_kokko">
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <TextField
                                id="outlined-textarea"
                                label="What's happening?"
                                placeholder="Input here"
                                multiline
                            />
                            <Stack direction="row" justifyContent="flex-end">
                                <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Visible to Everyone" />
                                <Button variant="outlined" >Kokko!</Button>
                            </Stack>
                        </Stack>
                    </ListItem>

                    <ListItem key="kokko_1">
                        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
                            <CardHeader
                                avatar={<Avatar src="avatars/ianhui.png"/>}
                                title="XU Jiahao"
                                subheader="April 28, 2022"
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    Thanks to the Bipartisan Infrastructure Law, we’re going to start replacing 100% of the lead pipes and water lines that go into homes and schools in this country.
                                </Typography>
                                <Typography variant="body1">
                                    Every American, every child, should be able to turn on a faucet and drink water that’s clean.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <Favorite/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <Share/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </ListItem>

                    <ListItem key="kokko_2">
                        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
                            <CardHeader
                                avatar={<Avatar src="avatars/yzhuo.png"/>}
                                title="YUAN Zhuo"
                                subheader="April 13, 2022"
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    The adorable pink hero <Link>#Kirby</Link> made his debut in Kirby's Dream Land on Game Boy in Japan 30 years ago today! What is your favorite Kirby memory?
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                image="examples/FRXaiWUWUAIMXEO.jpeg"
                                alt="Kirby Image"
                            />
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <Favorite color="error"/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <Share/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </ListItem>

                    <ListItem key="kokko_3">
                        <Card sx={{ width: '100%' }} variant="outlined" elevation={0}>
                            <CardHeader
                                avatar={<Avatar src="avatars/xiqyu.png"/>}
                                title="YU Xiqian"
                                subheader="April 26, 2022"
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    can't believe what i've just seen...
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <Favorite/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <Share/>
                                </IconButton>
                            </CardActions>
                        </Card>
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
                                height="140"
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
                                height="140"
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