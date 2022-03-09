import { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Search, SearchIconWrapper, StyledInputBase } from "../UI/InlineSearch";
import { Drawer, Typography, AppBar, Toolbar, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeContext } from "../UI/CustomTheme";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { format } from "date-fns";

import MenuItems from "./MenuItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: theme.palette.primary.light,
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
      minHeight: "100vh",
      height: "100%",
    },
    drawer: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        border: "none",
      },
    },
    fabStyle: {
      position: "fixed",
      bottom: "5%",
      right: "5%",
      zIndex: 9999,
      backgroundColor: "#f44336",
      "&:hover": {
        backgroundColor: "#e53935",
      },
    },
    title: {
      padding: theme.spacing(2),
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.light,
    },
    appbar: {
      backgroundColor: theme.palette.primary.main,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

const Children = (props) => {
  const { page, toolbar } = useStyles();
  return (
    <div className={page}>
      <div className={toolbar}></div>
      {props.children}
    </div>
  );
};

const Layout = (props) => {
  const classes = useStyles();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const searchNotesHandler = (event) => {
    props.onSearch(event.target.value);
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div>
      <Typography className={classes.title} variant="h5">
        Notify
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appbar}
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.date}
            sx={{ mr: 2, display: { md: "block", xs: "none" } }}
          >
            {format(new Date(), "do MMMM Y , ccc")}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={searchNotesHandler}
            />
          </Search>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Avatar src="/pen.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClick={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawerContent}
        <MenuItems />
      </Drawer>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        {drawerContent}
        <MenuItems />
      </Drawer>
      <Children children={props.children} />
    </div>
  );
};

export default Layout;
