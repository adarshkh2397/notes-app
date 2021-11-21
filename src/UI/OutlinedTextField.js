import TextField from "@mui/material/TextField";

const OutlinedTextField = (props) => {
  return (
    <TextField
      sx={{ marginTop: 2, marginBottom: 2, display: "block" }}
      variant="outlined"
      color="secondary"
      fullWidth
      {...props}
      required
    ></TextField>
  );
};

export default OutlinedTextField;
