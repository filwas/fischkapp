import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { JSX, JSXElementConstructor, useState } from "react";
import { NewCard } from "./components/NewCard";

function App() {

  let cardsMemory = [{front: "FRONT", back: "BACK"}]

  let basicCards: JSX.Element[] = []

  cardsMemory.forEach(cardValues => {
    basicCards.push(<Card faceValue={cardValues.front} flipValue={cardValues.back}/>)
  })

  const [cardsArray, setCardsArray] = useState(basicCards)

  const handleAddCardButtonClick = () => {
    setCardsArray([<NewCard />, ...cardsArray])
  };

  


  return (
    <AppLayout>
      <AppHeader
        cardsAmount={cardsArray.length}
        logoURL={logo}
        onClick={handleAddCardButtonClick}
      />
      <div className={styles.renderContainer}>
        {cardsArray}
      </div>
    </AppLayout>
  );
}

export default App;
