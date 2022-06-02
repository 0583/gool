import React from "react";
import {
    Avatar,
    Typography,
    Grid,
    CssBaseline,
    Paper,
    TextField,
    Divider,
    Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import RegisterDialog from "./RegisterDialog";
import {Service} from "../services/service";
import {LSConfig} from "../widgets/ConifgLocalstorageUtil";
import {Redirect} from "react-router-dom";

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

    const init = async () => {
        if (LSConfig.GetConfig() != null || LSConfig.GetUser() != null) {
            return  <Redirect to="/app"></Redirect>
        } else {
            let app_name: string = 'kobe_kokko-v0.1.1';
            let endpoint: string = 'http://202.120.40.82:11233';
            let fullpath: string = 'dist/proto/koke_kokko.proto';
            let filename: string = 'koke_kokko.proto';
            let version: string = 'v0.1.0';

            await Service.init_config(app_name, endpoint, fullpath, filename, version).then((value) => {
                LSConfig.SetConfig(value)
                // LSConfig.SetConfig(value);
                //把init的value放进localstorage
                console.log(LSConfig.GetConfig())
            }).catch((reason) => {
                console.log(reason);
            });
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await Service.login(LSConfig.GetConfig(), data.get("email") as string, data.get("password") as string)

    };
    const [registerDialogOpen, setRegisterDialogOpen] = React.useState<boolean>(false);
    return(
        <div onLoad={init}>
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
                            <Box component={"form"}  onSubmit={handleSubmit} width={300} sx={{mb:3}}>
                            <TextField
                                required
                                fullWidth
                                name="email"
                                label={"Email address"} variant={"outlined"}
                                sx={{mb:2}}
                            />
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                sx={{mb:2}}
                            />
                            <Button variant="contained" fullWidth
                                    type="submit">
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