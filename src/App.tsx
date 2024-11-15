import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ApiProvider, SessionProvider } from "./contexts";
import { Routes } from "./routes";

const theme = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
});

function App() {
  return (
    <ApiProvider>
      <SessionProvider>
        <ThemeProvider theme={theme} defaultMode="light">
          <CssBaseline enableColorScheme />
          <Routes />
        </ThemeProvider>
      </SessionProvider>
    </ApiProvider>
  );
}

export default App;
