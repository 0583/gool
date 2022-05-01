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
import {Menu, Home, Tag, Notifications, Bookmark, Person} from "@mui/icons-material";
import {useEffect} from "react";
import {Avatar, Stack} from "@mui/material";
import DrawerMenuItem from "./widgets/DrawerMenuItem";

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
    const theme = useTheme();

    const [open, setOpen] = React.useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [toolBarHeader, setToolBarHeader] = React.useState<string>("Home");
    const menuItems = [
        {
            index: 0,
            title: "Home",
            icon: (<Home/>),
            view: (<HomeView/>)
        },
        {
            index: 1,
            title: "Topics",
            icon: (<Tag/>),
            view: (<TopicsView/>)
        },
        {
            index: 2,
            title: "Notifications",
            icon: (<Notifications/>),
            view: (<NotificationsView/>)
        },
        {
            index: 3,
            title: "Bookmarks",
            icon: (<Bookmark/>),
            view: (<BookmarksView/>)
        },
        {
            index: 4,
            title: "Profile",
            icon: (<Person/>),
            view: (<ProfileView/>)
        },
    ]

    useEffect(() => {
        setToolBarHeader(menuItems[selectedIndex].title);
    }, [selectedIndex]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} elevation={0}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        backdropFilter: 'blur(50px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <Toolbar>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <Menu/>
                    </IconButton>
                    <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" justifyContent="flex-start">
                            <Typography variant="h5" noWrap component="div" fontWeight="bold" color="black">
                                { toolBarHeader }
                            </Typography>
                        </Stack>

                        <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
                            <Avatar src="avatars/xiqyu.png"/>
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
                open={open}
            >
                <DrawerHeader>
                    <Stack direction="row" height={64} alignItems="center" sx={{ width: '100%' }}>
                        <IconButton onClick={handleDrawerClose}>
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
                        menuItems.map(({index, icon, title}) => {
                            return (<DrawerMenuItem key={index}
                                                    selectedIndex={selectedIndex}
                                                    setSelectedIndex={setSelectedIndex}
                                                    index={index}
                                                    MenuIcon={icon}
                                                    title={title}/>);
                        })
                    }
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {menuItems[selectedIndex].view}
            </Main>
        </Box>
    );
}