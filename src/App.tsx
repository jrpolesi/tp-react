import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ApiProvider, LocalizedProvider, SessionProvider } from "./contexts";
import { Routes } from "./routes";

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
        <ThemeProvider theme={theme} defaultMode="light">
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
