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
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';

const drawerWidth = 260;

export default function Dashboard() {
    let location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [role, setRole] = React.useState({});
    const handleLogout = e => {
        logout()
    }
    const navigateHome = e => {
        navigate('/home')
    }
    let isActive = (x) => (location.pathname === x ? "active" : "li");

    React.useEffect(() => {
        axios.get(`http://localhost:4000/users/${user.email}`)
            .then(res => setRole({ chairman: res.data[0].isChairman, examCommittee: res.data[0].isExamCommittee }))
        // .catch(err => alert(err))
    }, [user])
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
                        minHeight: "100%"
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                {/* LOGO */}
                <Toolbar className='d-flex align-items-center flex-column w-100 text-center p-2'
                    style={
                        {
                            backgroundImage: "linear-gradient(120deg, #c9c9c9, white)",
                            userSelect: "none",
                            minHeight: "220px",
                            cursor: 'pointer'
                        }
                    }
                    onClick={navigateHome}
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
                {/* Navigation */}
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
                    {
                        // special options
                        (role.chairman === 1 || role.examCommittee) && <>
                            <ListItem key={"addMember"} disablePadding className={isActive("/addmember")}>
                                <ListItemButton>
                                    <Link to={"addmember"} style={{
                                        fontSize: "19px",
                                        fontFamily: "popins, sans-serif",
                                        color: 'black',
                                        textDecoration: 'none',
                                        display: 'block',
                                        width: '100%'
                                    }}
                                    >Add an examiner</Link>
                                </ListItemButton>
                            </ListItem>
                            {/* <ListItem key={"notify"} disablePadding className={isActive("/notify")}>
                                <ListItemButton>
                                    <Link to={"notify"} style={{
                                        fontSize: "19px",
                                        fontFamily: "popins, sans-serif",
                                        color: 'black',
                                        textDecoration: 'none',
                                        display: 'block',
                                        width: '100%'
                                    }}
                                    >Notify</Link>
                                </ListItemButton>
                            </ListItem> */}
                            <ListItem key={"decode"} disablePadding className={isActive("/decode")}>
                                <ListItemButton>
                                    <Link to={"decode"} style={{
                                        fontSize: "19px",
                                        fontFamily: "popins, sans-serif",
                                        color: 'black',
                                        textDecoration: 'none',
                                        display: 'block',
                                        width: '100%'
                                    }}
                                    >Decode</Link>
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
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
                    {(role.chairman === 1 || role.examCommittee) && <>
                        <ListItem key={"result"} disablePadding className={isActive("/result")}>
                            <ListItemButton>
                                <Link to={"result"} style={{
                                    fontSize: "19px",
                                    fontFamily: "popins, sans-serif",
                                    color: 'black',
                                    textDecoration: 'none',
                                    display: 'block',
                                    width: '100%'
                                }}>Result</Link>
                            </ListItemButton>
                        </ListItem>
                    </>}
                    {role.chairman === 1 && <>
                        <ListItem key={"chairman"} disablePadding className={isActive("/chairman")}>
                            <ListItemButton>
                                <Link to={"chairman"} style={{
                                    fontSize: "19px",
                                    fontFamily: "popins, sans-serif",
                                    color: 'black',
                                    textDecoration: 'none',
                                    display: 'block',
                                    width: '100%'
                                }}>exam committee</Link>
                            </ListItemButton>
                        </ListItem>
                    </>}
                </List>
                <Divider />
                <List>

                    {/* <ListItem key={"notification"} disablePadding className={isActive("/notification")}>
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
                    </ListItem> */}

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
                    <ListItem key={"logout"} disablePadding className={"li"}>
                        <ListItemButton onClick={handleLogout}>
                            <Link to={""} style={{
                                fontSize: "19px",
                                fontFamily: "popins, sans-serif",
                                color: 'black',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%'
                            }}>Log Out</Link>
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
