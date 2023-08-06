import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    ctc?: Palette["primary"];
  }

  interface PaletteOptions {
    ctc?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          //   color: "black",
          textDecoration: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#2C2C2C",
      light: "#565656",
      dark: "#1e1e1e",
    },
    secondary: {
      main: "#FCFCFC",
    },
    ctc: {
      main: "#83FFE6",
    },
  },
});
