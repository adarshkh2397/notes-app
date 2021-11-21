import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const useStyles = makeStyles({
  btn: {
    float: "right",
  },
});

const CustomButton = () => {
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      type="submit"
      variant="contained"
      color="secondary"
      startIcon={<AddCircleOutlineOutlinedIcon />}
    >
      Add note
    </Button>
  );
};

export default CustomButton;
