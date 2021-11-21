import { makeStyles } from "@mui/styles";
import { Drawer, Typography, AppBar, Toolbar, Avatar } from "@mui/material";
import { format } from "date-fns";

import MenuItems from "./MenuItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    },
    title: {
      padding: theme.spacing(2),
      color: "#7e57c2",
      backgroundColor: "#fbfbfb",
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
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Adarsh</Typography>
          <Avatar src="/pen.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <CustomDrawer>
        <MenuItems />
      </CustomDrawer>
      <Children children={props.children} />
    </div>
  );
};

export default Layout;
