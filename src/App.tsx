import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg"

import "./App.css";

function App() {
  return (
    <AppLayout>
      <AppHeader cardsAmount={4} logoURL={logo}/>
    </AppLayout>
  );
}

export default App;
