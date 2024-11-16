import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ApiProvider, LocalizedProvider, SessionProvider } from "./contexts";
import { Routes } from "./routes";
import { Storage } from "./services";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    // mode: "dark",
  },
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
