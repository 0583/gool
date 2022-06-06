import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeView from "./views/HomeView";
import TopicsView from "./views/TopicsView";
import NotificationsView from "./views/NotificationsView";
import BookmarksView from "./views/BookmarksView";
import ProfileView from "./views/ProfileView";
import { Home, Tag, Notifications, Bookmark, Person, Close, Menu as MenuIcon, Logout } from "@mui/icons-material";
import {useEffect, useRef} from "react";
import { Avatar, Stack, Snackbar, Menu, MenuItem, Button, ListItemIcon } from "@mui/material";
import DrawerMenuItem from "./widgets/DrawerMenuItem";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Config, Service } from "./services/service";
import { LocalStoreConfig } from './widgets/ConifgLocalstorageUtil';
import {makeWebSocket} from "./services/websocket";
import {Request} from "./services/request";

export interface SnackBarSenderProps {
    sender: (message: string) => void;
}

export interface SnackbarMessage {
    message: string;
    key: number;
}

export interface State {
    open: boolean;
    snackPack: readonly SnackbarMessage[];
    messageInfo?: SnackbarMessage;
}

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    //notification提示标

    const [UpdateNoti, setUpdateNoti] = React.useState<number>(0);
    const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState<string>('info');
    const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(
        undefined,
    );
    const [isWebaasOK, setIsWebaasOK] = React.useState<boolean>(false);

    const timer: any = useRef(null);

    useEffect(() => {
        timer.current = setInterval(() => {
            refreshWebaas()
        }, 1000)
        return () => {
            clearInterval(timer.current)
        }
    },[])

    const refreshWebaas = () => {
        Request.say_hello().then((response: any) => {
            setIsWebaasOK(response['message'] === "Hello World!")
        }).catch((err) => {
            setIsWebaasOK(false)
        })
    }

    React.useEffect(() => {
        makeWebSocket(( ev) => {
            console.log('callback function called! with', ev)

            Service.list_article_for_user(LocalStoreConfig.get_config()!).then(
                (articles) => {

                }
            )
            console.log(UpdateNoti)
            setUpdateNoti(UpdateNoti + 1)
        })
    }, [])

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

    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [toolBarHeader, setToolBarHeader] = React.useState<string>("Home");
    const menuItems = [
        {
            index: 0,
            title: "Home",
            icon: (<Home />),
            view: (<HomeView sender={sendMessage} />),
            update: 0
        },
        {
            index: 1,
            title: "Topics",
            icon: (<Tag />),
            view: (<TopicsView sender={sendMessage} />),
            update: 0
        },
        {
            index: 2,
            title: "Notifications",
            icon: (<Notifications />),
            view: (<NotificationsView sender={sendMessage} />),
            update: UpdateNoti
        },
        {
            index: 3,
            title: "Bookmarks",
            icon: (<Bookmark />),
            view: (<BookmarksView sender={sendMessage} />),
            update: 0
        },
        {
            index: 4,
            title: "Profile",
            icon: (<Person />),
            view: (<ProfileView sender={sendMessage} />),
            update: 0
        },
    ]

    useEffect(() => {
        setToolBarHeader(menuItems[selectedIndex].title);
    }, [selectedIndex]);


    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };


    return (
        <div>
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
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={drawerOpen} elevation={0}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        backdropFilter: 'blur(50px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}>
                    <Toolbar>
                        <IconButton
                            color="primary"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" justifyContent="flex-start">
                                <Typography variant="h5" noWrap component="div" fontWeight="bold" color="black">
                                    {toolBarHeader}
                                </Typography>
                            </Stack>

                            <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
                                <Button variant="outlined" color={isWebaasOK ? "success" : "error"}>
                                    {isWebaasOK ? "WeBaaS OK" : "WeBaaS Down"}
                                </Button>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState: any) => (
                                        <React.Fragment>
                                            <Button {...bindTrigger(popupState)}>
                                                <Avatar src="avatars/xiqyu.png" />
                                            </Button>
                                            <Menu {...bindMenu(popupState)}
                                                elevation={1}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}>
                                                <MenuItem disableRipple>
                                                    <Typography variant='h5'>
                                                        { LocalStoreConfig.get_config()?.user?.username ?? "?" }
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem disableRipple>
                                                    { LocalStoreConfig.get_config()?.user?.email ?? "?" }
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem onClick={
                                                    () => {
                                                        popupState.close();
                                                        Service.logout(LocalStoreConfig.get_config() ?? new Config());
                                                    }
                                                }>
                                                    <ListItemIcon>
                                                        <Logout />
                                                    </ListItemIcon>
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </Stack>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                >
                    <DrawerHeader>
                        <Stack direction="row" height={64} alignItems="center" sx={{ width: '100%' }}>
                            <IconButton color="primary" onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon color="primary" /> : <ChevronRightIcon color="primary" />}
                            </IconButton>
                            <img width="24" height="24" src="icon.png" alt="Koke-kokko Icon"></img>
                            <Typography sx={{ marginLeft: 2 }} variant="h5" color="primary">Koke-kokko</Typography>
                        </Stack>
                    </DrawerHeader>
                    <Divider />
                    <List
                        sx={{ width: '100%', maxWidth: 360 }}
                        aria-label="contacts"
                    >
                        {
                            menuItems.map(({ index, icon, title, update }) => {
                                return (<DrawerMenuItem key={index}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                    index={index}
                                    MenuIcon={icon}
                                    title={title}
                                    update={update} />);
                            })
                        }
                    </List>
                </Drawer>
                <Main open={drawerOpen}>
                    <DrawerHeader />
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Box sx={{ width: '100%', maxWidth: 1280 }}>
                            {menuItems[selectedIndex].view}
                        </Box>
                    </Stack>
                </Main>
            </Box>
        </div>
    );
}