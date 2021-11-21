import { makeStyles } from "@mui/styles";
import { DeleteOutlined } from "@mui/icons-material";
import { yellow, green, blue, pink, grey } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";

const useStyles = makeStyles({
  test: {
    borderBottom: ({ category }) => {
      if (category === "work") {
        return `3px solid ${yellow[700]}`;
      } else if (category === "todos") {
        return `3px solid ${blue[700]}`;
      } else if (category === "reminder") {
        return `3px solid ${pink[700]}`;
      } else if (category === "money") {
        return `3px solid ${green[700]}`;
      } else {
        return `3px solid ${grey[700]}`;
      }
    },
  },

  avatar: {
    backgroundColor: ({ category }) => {
      if (category === "work") {
        return yellow[700];
      } else if (category === "money") {
        return green[700];
      } else if (category === "todos") {
        return blue[700];
      } else if (category === "reminder") {
        return pink[700];
      } else {
        return grey[700];
      }
    },
  },
});

const NoteCard = (props) => {
  const { id, title, details, category } = props.note;
  const classes = useStyles({ category });
  return (
    <Card elevation={2} className={classes.test}>
      <CardHeader
        action={
          <IconButton onClick={() => props.onDeleteNote(id)}>
            <DeleteOutlined />
          </IconButton>
        }
        avatar={
          <Avatar className={classes.avatar}>
            {category[0].toUpperCase()}
          </Avatar>
        }
        title={title}
        subheader={category.toUpperCase()}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
