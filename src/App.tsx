import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { JSX, useState } from "react";
import { NewCard } from "./components/NewCard";
import React from "react";

interface AppProps {
  basicCards?: { face: string; back: string }[];
}
function App(props: AppProps) {
  let basicCards: JSX.Element[] = [];

  const [cardsArray, setCardsArray] = useState(basicCards);

  const handleAddCardButtonClick = () => {
    setCardsArray([<NewCard key={cardsArray.length + 1} />, ...cardsArray]);
  };

  props.basicCards &&
    props.basicCards.forEach((cardData, cardIndex) => {
      basicCards.push(
        <Card
          faceValue={cardData.face}
          flipValue={cardData.back}
          key={cardIndex + 1}
        />
      );
    });

  return (
    <AppLayout>
      <AppHeader
        cardsAmount={cardsArray.length}
        logoURL={logo}
        onClick={handleAddCardButtonClick}
      />
      <div className={styles.renderContainer}>{cardsArray}</div>
    </AppLayout>
  );
}

export default App;
