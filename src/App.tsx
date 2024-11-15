import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline enableColorScheme />
            <Routes />
          </LocalizationProvider>
        </ThemeProvider>
      </SessionProvider>
    </ApiProvider>
  );
}

export default App;
