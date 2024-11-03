import { Routes } from "./routes";
import { SessionProvider } from "./shared";
import "./shared/styles/App.scss";

function App() {
  return (
    <SessionProvider>
      <Routes />
    </SessionProvider>
  );
}

export default App;
