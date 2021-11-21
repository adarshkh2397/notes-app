import { createTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

const secondaryColor = deepPurple;

export const theme = createTheme({
  palette: {
    primary: {
      light: "#fefefe",
      main: "#f8f8f8",
    },
    secondary: {
      light: secondaryColor[50],
      main: secondaryColor[500],
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          fontSize: "0.75rem",
        },
      },
    },
  },
});
