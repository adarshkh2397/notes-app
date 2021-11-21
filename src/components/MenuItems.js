import { useNavigate, useLocation } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const useStyles = makeStyles({
  active: {
    backgroundColor: "#f6f6f6",
  },
});

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          button
          onClick={() => navigate(item.path)}
          className={location.pathname === item.path ? classes.active : ""}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.text}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuItems;
