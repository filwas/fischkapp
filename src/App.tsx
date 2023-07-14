import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { useState } from "react";

function App() {
  const [cardsAmount, setCardsAmount] = useState(1)
  const [cardsFrameArray, setcardsFrameArray] = useState([{}]);

  const handleAddCardButtonClick = () => {
    setCardsAmount(cardsAmount+1)
    setcardsFrameArray(prevCards => [...prevCards, {}]);
  };
  
  const renderCards = () => {
    return cardsFrameArray.map(() => (
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
