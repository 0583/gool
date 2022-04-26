import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

interface DrawerMenuItemProps {
    selectedIndex: number,
    setSelectedIndex: (i: number) => void,
    index: number,
    MenuIcon: any,
    title: string
}
function DrawerMenuItem(props: DrawerMenuItemProps) {
    return (
        <ListItem disablePadding>
            <ListItemButton
                selected={props.selectedIndex === props.index}
                onClick={(_) => props.setSelectedIndex(props.index)}>
                <ListItemIcon>
                    {props.MenuIcon}
                </ListItemIcon>
                <ListItemText primary={props.title}/>
            </ListItemButton>
        </ListItem>
    );
}

export default DrawerMenuItem;