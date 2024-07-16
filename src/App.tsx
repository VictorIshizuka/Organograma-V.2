import { ThemeProvider } from "./common/ContextTheme";
import { Routes } from "./common/Routes";

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
