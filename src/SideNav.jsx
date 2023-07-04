import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "./utils/app/mainSlice";
import { useDispatch } from "react-redux";

const drawerWidth = 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "black",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 0px)`,
    // display: 'none'
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };
  const handleLogout = () => {
    dispatch(logout());
  };
 

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          open={open}
          sx={{
            transition: "opacity 0.5s",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
             
              edge="start"
              sx={{
                marginRight: 0,
                ...(open && { display: "none" }),
              }}
            >
            
            </IconButton>

            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                paddingLeft: "10px",
                fontFamily:'MB Corpo A Title ',
                fontSize:'1rem'
                
              }}
            >
              Digital Board <LiveTvIcon sx={{width:"50px", fontSize:'1.8rem'}}/>
            </Typography>

            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <MenuItem onClick={handleLogout} sx={{fontFamily:'MB Corpo S Text'}}>
                {" "}
                Logout <LogoutIcon />
              </MenuItem>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,           
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
     
          variant="permanent"  
        >
          <DrawerHeader>
           
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "gray",
                  transform: "scale(1.12)",
                  // add any other hover styles you want
                },
              }}
              onClick={() => {
               
                navigate("/tvdash?cebufloor=10");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Dashboard"
                  sx={{paddingLeft:"18px", color: "white",fontFamily:'MB Corpo S Text'}}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "gray",
                  transform: "scale(1.12)",
                 
                },
              }}
              onClick={() => {
                navigate("/tvdash/Image");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <AddPhotoAlternateIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Image"
                  sx={{ paddingLeft:"18px", color: "white" , fontFamily:'MB Corpo A Text Condensed'}}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </Box>
    </>
  );
}
