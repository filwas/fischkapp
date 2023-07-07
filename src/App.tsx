import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";

import "./App.css";

function App() {
  return (
    <AppLayout>
      <AppHeader cardsAmt={0} />
    </AppLayout>
  );
}

export default App;
