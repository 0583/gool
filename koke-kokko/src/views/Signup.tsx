import React from "react";
import {
    Avatar,
    Card,
    ListItem,
    Stack,
    Typography,
    ListItemAvatar,
    ListItemText,
    ThemeProvider,
    Grid,
    CssBaseline,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Divider,
    Button,
    Link
} from "@mui/material";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import RegisterDialog from "./RegisterDialog";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4}} >
            {'Copyright © '}
            {new Date().getFullYear()}
            {' · Koke-kokko Team'}
        </Typography>
    );
}

function Signup() {

    const [registerDialogOpen, setRegisterDialogOpen] = React.useState<boolean>(false);

    return(
        <div>
            <RegisterDialog
                isOpen={registerDialogOpen}
                setOpen={setRegisterDialogOpen}
            />
            <Grid container component="main" sx={{height: '100vh'}} >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(loginbg.png)",
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item  xs={12} sm={8} md={5} component={Paper} sx={{display:"flex"}} alignItems={"center"}>
                    <Grid sx={{ml:3}} width={"100%"}>
                        <Grid width={400}>
                        <Box width={"100%"}>
                            <Avatar src={"icon.png"} variant={"square"} sx={{ width: 42, height: 42 }}/>
                            <Typography sx={{mt:6,mb:6,fontWeight:800, fontSize:64 }}>What's happening</Typography>
                            <Typography sx={{fontWeight:700 ,fontSize:31, mb:4}}>Join Now</Typography>
                            <Box component={"form"} width={300} sx={{mb:3}}>
                            <TextField
                                required
                                fullWidth
                                label={"Email address"} variant={"outlined"}
                                sx={{mb:2}}
                            />
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                sx={{mb:2}}
                            />
                            <Button variant="contained" fullWidth>
                                Sign in
                            </Button>
                            </Box>
                            <Divider sx={{width:300}}>or</Divider>
                            <Button variant="outlined"
                                    onClick={ () => {setRegisterDialogOpen(true) }}
                                    endIcon={<AppRegistrationSharpIcon /> }
                                    sx={{width:300 , mt:3}}>
                                Register
                            </Button>
                            <Copyright/>
                        </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup