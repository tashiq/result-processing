import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import img from '../../../Images/cu_logo.png'
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import "./Dashboard.css"
import { Link, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 260;

export default function Dashboard() {
    let location = useLocation();
    let isActive = (x) => (location.pathname === x ? "active" : "li");
    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: "rgb(226, 229, 228)",
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar className='d-flex align-items-center flex-column w-100 text-center p-2'
                    style={
                        {
                            backgroundImage: "linear-gradient(120deg, #c9c9c9, white)",
                            userSelect: "none"
                        }
                    }
                >
                    <img src={img} alt="Cu logo" className='img-thumbnail rounded drawer-logo' />
                    <Typography style={{
                        fontFamily: "Roboto",
                        fontWeight: "500",
                        color: "rgb(33 44 30)",
                        fontSize: '1.1em'
                    }}>Chittagong University<br /> Result Processing System</Typography>
                </Toolbar>
                <Divider />
                <List
                >
                    <ListItem key={"home"} disablePadding className={isActive("/home")}>
                        <ListItemButton>
                            <Link to={"home"} style={{
                                fontSize: "19px",
                                fontFamily: "popins, sans-serif",
                                color: 'black',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%'
                            }}
                            >home</Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"profile"} disablePadding className={isActive("/profile")}>
                        <ListItemButton>
                            <Link to={"profile"} style={{
                                fontSize: "19px",
                                fontFamily: "popins, sans-serif",
                                color: 'black',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%'
                            }}>profile</Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"mark"} disablePadding className={isActive("/mark")}>
                        <ListItemButton>
                            <Link to={"mark"} style={{
                                fontSize: "19px",
                                fontFamily: "popins, sans-serif",
                                color: 'black',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%'
                            }}>mark input</Link>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>

                    <ListItem key={"notification"} disablePadding className={isActive("/notification")}>
                        <ListItemButton>
                            <Link to={"notification"} style={{
                                fontSize: "19px",
                                fontFamily: "popins, sans-serif",
                                color: 'black',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%'
                            }}>Notification</Link>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={"history"} disablePadding className={isActive("/history")}>
                        <ListItemButton>
                            <Link to={"history"} style={{
                                fontSize: "19px",
                                fontFamily: "popins, sans-serif",
                                color: 'black',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%'
                            }}>History</Link>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                style={{
                    backgroundColor: "rgb(245, 246, 248)",
                    height: "100%"
                }}
                sx={{ flexGrow: 1, p: 3 }}
            >

                <Typography paragraph>
                    <Outlet />
                </Typography>
            </Box>
        </Box >
    );
}
