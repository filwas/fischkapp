import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([{}]);

  const handleAddCard = () => {
    setCards(prevCards => [...prevCards, {}]);
  };

  const handleDeleteCard = (index:number) => {
    //to be implemented
  };

  const renderCards = () => {
    return cards.map((card, index) => (
      <Card key={index} onDelete={() => handleDeleteCard(index)} />
    ));
  };

  return (
    <AppLayout>
      <AppHeader
        cardAmount={cards.length}
        logoURL={logo}
        onClick={handleAddCard}
      />
      <div className={styles.renderContainer}>{renderCards()}</div>
    </AppLayout>
  );
}

export default App;
