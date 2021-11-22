import { createContext, useState, useMemo, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple, grey, purple } from "@mui/material/colors";

const secondaryColor = deepPurple;
const darkColor = purple;

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ColorModeContextProvider = (props) => {
  const [mode, setMode] = useState("light");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (prefersDarkMode) {
      setMode("dark");
    }
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  light: "#fefefe",
                  main: "#f8f8f8",
                },
                secondary: {
                  light: secondaryColor[50],
                  main: secondaryColor[500],
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  light: "#001E3C",
                  main: "#0A1929",
                },
                divider: "#132F4C",
                secondary: {
                  light: darkColor[50],
                  main: darkColor[600],
                },
                text: {
                  primary: "#fff",
                  secondary: "#f9f9f9",
                  dark: grey[800],
                },
              }),
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
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: "transparent",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// export const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#fefefe",
//       main: "#f8f8f8",
//     },
//     secondary: {
//       light: secondaryColor[50],
//       main: secondaryColor[500],
//     },
//   },
//   typography: {
//     fontFamily: "Quicksand",
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//   },
//   components: {
//     MuiCardHeader: {
//       styleOverrides: {
//         subheader: {
//           fontSize: "0.75rem",
//         },
//       },
//     },
//   },
// });
