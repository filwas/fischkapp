import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([{}]);

  const handleAddCardButtonClick = () => {
    setCards(prevCards => [...prevCards, {}]);
  };

  const handleDeleteCardButtonClick = (index:number) => {
    //to be implemented
  };

  const renderCards = () => {
    return cards.map((card, index) => (
      <Card key={index} onDelete={() => handleDeleteCardButtonClick(index)} />
    ));
  };

  return (
    <AppLayout>
      <AppHeader
        cardAmount={cards.length}
        logoURL={logo}
        onClick={handleAddCardButtonClick}
      />
      <div className={styles.renderContainer}>{renderCards()}</div>
    </AppLayout>
  );
}

export default App;
