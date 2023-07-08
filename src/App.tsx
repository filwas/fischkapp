import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg"

import "./App.css";
import { Card } from "./components/Card";

function App() {
  return (
    <AppLayout>
      <AppHeader cardAmount={4} logoURL={logo}/>
      <Card></Card>
    </AppLayout>
  );
}

export default App;
