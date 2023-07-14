import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { useRef, useState } from "react";

function App() {
  const [cardsAmount, setCardsAmount] = useState(1)
  const [cards, setCards] = useState([{}]);

  const handleAddCardButtonClick = () => {
    setCardsAmount(cardsAmount+1)
    setCards(prevCards => [...prevCards, {}]);
  };
  

  const renderCards = () => {
    return cards.map(() => (
      <Card cardsAmount={cardsAmount} setCardsAmount={setCardsAmount} />
    ));
  };

  return (
    <AppLayout>
      <AppHeader
        cardsAmount={cardsAmount}
        logoURL={logo}
        onClick={handleAddCardButtonClick}
      />
      <div className={styles.renderContainer}>{renderCards()}</div>
    </AppLayout>
  );
}

export default App;
