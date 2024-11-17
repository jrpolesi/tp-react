import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  ApiProvider,
  LocalizedProvider,
  SessionProvider,
  SnackBarProvider,
} from "./contexts";
import { Routes } from "./routes";
import { Storage } from "./services";
import { theme } from "./utils";

function App() {
  return (
    <ApiProvider>
      <SessionProvider>
        <ThemeProvider
          theme={theme}
          defaultMode={(Storage.getTheme() as "dark" | "light") ?? "system"}
        >
          <LocalizedProvider>
            <SnackBarProvider>
              <CssBaseline enableColorScheme />
              <Routes />
            </SnackBarProvider>
          </LocalizedProvider>
        </ThemeProvider>
      </SessionProvider>
    </ApiProvider>
  );
}

export default App;
