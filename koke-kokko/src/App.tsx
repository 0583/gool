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
            icon: (<Home/>)
        },
        {
            index: 1,
            title: "Topics",
            icon: (<Tag/>)
        },
        {
            index: 2,
            title: "Notifications",
            icon: (<Notifications/>)
        },
        {
            index: 3,
            title: "Messages",
            icon: (<Message/>)
        },
        {
            index: 4,
            title: "Bookmarks",
            icon: (<Bookmark/>)
        },
        {
            index: 5,
            title: "Profile",
            icon: (<Person/>)
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
          <AppBar position="fixed" open={open}>
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
                  <Typography sx={{ marginLeft: 2 }} color="primary">Koke-kokko</Typography>
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
              <DrawerHeader>Home</DrawerHeader>
              <Typography paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                  enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                  imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                  Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                  Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                  adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                  nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                  leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                  feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                  consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                  sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                  Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                  eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                  neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                  sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                  tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                  gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                  et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                  tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                  eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                  posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
          </Main>
      </Box>
  );
}

export default App;
