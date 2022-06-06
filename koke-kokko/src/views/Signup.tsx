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
    Snackbar
} from "@mui/material";
import Box from "@mui/material/Box";
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import RegisterDialog from "./RegisterDialog";
import { Service } from "../services/service";
import { LocalStoreConfig } from "../widgets/ConifgLocalstorageUtil";
import { Config } from "../services/service";
import { SnackbarMessage, SnackBarSenderProps } from "../App";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }} >
            {'Copyright © '}
            {new Date().getFullYear()}
            {' · Koke-kokko Team'}
        </Typography>
    );
}

function Signup() {

    const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState<string>('info');
    const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(
        undefined,
    );

    React.useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClick = (message: string) => () => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    };

    const sendMessage = (message: string) => {
        setSeverity(severity);
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const init = async () => {
        let config = LocalStoreConfig.get_config();
        if (config && config.user && config.user.username) {
            window.location.href = "/#/app"
        } else {
            let app_name: string = 'kobe_kokko-v4.1.2';
            let endpoint: string = 'http://202.120.40.82:11233';
            let fullpath: string = 'dist/proto/koke_kokko.proto';
            let filename: string = 'koke_kokko.proto';
            let version: string = 'v2.1.1';

            await Service.init_config(app_name, endpoint, fullpath, filename, version).then((value) => {
                LocalStoreConfig.set_config(value)
                // LocalStoreConfig.SetConfig(value);
                //把init的value放进localstorage
            }).catch((reason) => {
                console.log(reason);
            });
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let config = LocalStoreConfig.get_config() as Config;
        await Service.login(config, data.get("email") as string, data.get("password") as string).then(() => {
            console.log("aaa")
            LocalStoreConfig.set_config(config);
            sendMessage("login success!");
            window.location.href = "/#/app";
        })

    };
    const [registerDialogOpen, setRegisterDialogOpen] = React.useState<boolean>(false);
    return (
        <div onLoad={init}>
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                message={messageInfo ? messageInfo.message : undefined}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={handleClose}
                        >
                            <Close />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <RegisterDialog
                sender={sendMessage}
                isOpen={registerDialogOpen}
                setOpen={setRegisterDialogOpen}
            />
            <Grid container component="main" sx={{ height: '100vh' }} >
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
                <Grid item xs={12} sm={8} md={5} component={Paper} sx={{ display: "flex" }} alignItems={"center"}>
                    <Grid sx={{ ml: 3 }} width={"100%"}>
                        <Grid width={400}>
                            <Box width={"100%"}>
                                <Avatar src={"icon.png"} variant={"square"} sx={{ width: 42, height: 42 }} />
                                <Typography sx={{ mt: 6, mb: 6, fontWeight: 800, fontSize: 64 }}>What's happening</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: 31, mb: 4 }}>Join Now</Typography>
                                <Box component={"form"} onSubmit={handleSubmit} width={300} sx={{ mb: 3 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        label={"Email address"} variant={"outlined"}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        sx={{ mb: 2 }}
                                    />
                                    <Button variant="contained" fullWidth
                                        type="submit">
                                        Sign in
                                    </Button>
                                </Box>
                                <Divider sx={{ width: 300 }}>or</Divider>
                                <Button variant="outlined"
                                    onClick={() => { setRegisterDialogOpen(true) }}
                                    endIcon={<AppRegistrationSharpIcon />}
                                    sx={{ width: 300, mt: 3 }}>
                                    Register
                                </Button>
                                <Copyright />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup