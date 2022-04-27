import React, {useEffect} from 'react';
import './App.css';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    styled,
    Typography,
    Toolbar,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {Menu, Home, Tag, Notifications, Message, Bookmark, Person, ArrowLeft} from "@mui/icons-material";
import DrawerMenuItem from "./widgets/DrawerMenuItem";
import HomeView from "./views/HomeView";
import TopicsView from "./views/TopicsView";
import NotificationsView from "./views/NotificationsView";
import MessagesView from "./views/MessagesView";
import BookmarksView from "./views/BookmarksView";
import ProfileView from "./views/ProfileView";

function App() {
    const drawerWidth = 240;

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

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
        open?: boolean;
    }>(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
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

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex',
        variant: 'outlined',
    }));

    const [open, setOpen] = React.useState<boolean>(true);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
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
            title: "Messages",
            icon: (<Message/>),
            view: (<MessagesView/>)
        },
        {
            index: 4,
            title: "Bookmarks",
            icon: (<Bookmark/>),
            view: (<BookmarksView/>)
        },
        {
            index: 5,
            title: "Profile",
            icon: (<Person/>),
            view: (<ProfileView/>)
        },
    ]
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        setToolBarHeader(menuItems[selectedIndex].title);
    }, [selectedIndex]);

  return (
      <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" variant="outlined" open={open}>
              <Toolbar>
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: 'none' }) }}
                  >
                      <Menu/>
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                      { toolBarHeader }
                  </Typography>
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
                  <IconButton onClick={handleDrawerClose}>
                      <ArrowLeft color="primary"/>
                  </IconButton>
                  <img width="24" src="icon.png" alt="Koke-kokko Icon"></img>
                  <Typography sx={{ marginLeft: 2 }} variant="h5" color="primary">Koke-kokko</Typography>
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
              <DrawerHeader/>
              <div>
                  {menuItems[selectedIndex].view}
              </div>
          </Main>
      </Box>
  );
}

export default App;
