import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ApiProvider, LocalizedProvider, SessionProvider } from "./contexts";
import { Routes } from "./routes";
import { Storage } from "./services";

let theme = createTheme({});

theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    // mode: "dark",
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
  } as any,
});

function App() {
  return (
    <ApiProvider>
      <SessionProvider>
        <ThemeProvider
          theme={theme}
          defaultMode={(Storage.getTheme() as "dark" | "light") ?? "system"}
        >
          <LocalizedProvider>
            <CssBaseline enableColorScheme />
            <Routes />
          </LocalizedProvider>
        </ThemeProvider>
      </SessionProvider>
    </ApiProvider>
  );
}

export default App;
