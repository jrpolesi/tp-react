import { createTheme, PaletteColor } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    salmon?: PaletteColor;
    purple?: PaletteColor;
    green?: PaletteColor;
  }
  interface Palette {
    salmon?: PaletteColor;
    purple?: PaletteColor;
    green?: PaletteColor;
  }
}

let theme = createTheme({});

theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          paper: "#242424",
        },
      },
    },
    light: {
      palette: {
        background: {
          paper: "#f5f5f5",
        },
      },
    },
  },
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: "#FF5733",
      },
      name: "salmon",
    }),
    purple: theme.palette.augmentColor({
      color: {
        main: "#8533ff",
      },
      name: "blue",
    }),
    green: theme.palette.augmentColor({
      color: {
        main: "#00a62f",
      },
      name: "green",
    }),
  },
});

export { theme };
