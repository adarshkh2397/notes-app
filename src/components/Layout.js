import { makeStyles } from "@mui/styles";
import { Search, SearchIconWrapper, StyledInputBase } from "../UI/InlineSearch";
import { Drawer, Typography, AppBar, Toolbar, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";

import MenuItems from "./MenuItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: theme.palette.primary.light,
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
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
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
      width: `calc(100% - ${drawerWidth}px)`,
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

const CustomDrawer = (props) => {
  const { drawer, title } = useStyles();

  return (
    <Drawer className={drawer} variant="permanent" anchor="left">
      <div>
        <Typography className={title} variant="h5">
          Notify
        </Typography>
      </div>
      {props.children}
    </Drawer>
  );
};

const Layout = (props) => {
  const classes = useStyles();

  const searchNotesHandler = (event) => {
    props.onSearch(event.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
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
          <Typography>Adarsh</Typography>
          <Avatar src="/pen.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <CustomDrawer>
        <MenuItems />
      </CustomDrawer>
      <Children children={props.children} />
      {/*<Fab
        aria-label="change theme"
        size="small"
        className={classes.fabStyle}
      ></Fab>*/}
    </div>
  );
};

export default Layout;
