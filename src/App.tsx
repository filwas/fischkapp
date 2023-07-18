import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { JSX, useEffect, useState } from "react";
import { NewCard } from "./components/NewCard";
import React from "react";

interface AppProps {
  basicCards: {
    face: string;
    back: string;
  }[];
}

interface CardObject {
  face: string;
  back: string;
}

function App(props: AppProps) {
  const importedCards = props.basicCards.map((card, index) => {
    return { face: card.face, back: card.back, key: index };
  });

  const [cardsArray, setCardsArray] = useState(importedCards);

  const [incrementalKey, setIncrementalKey] = useState(cardsArray.length);

  useEffect(
    () => setIncrementalKey((prevKey) => prevKey + 1),
    [cardsArray, setCardsArray]
  );

  const [isNewCardDisplayed, setIsNewCardDisplayed] = useState(false);

  const handleAddCardButtonClick = () => {
    setIsNewCardDisplayed(true);
  };

  const handleSaveButtonClick = (props: CardObject) => {
    setCardsArray([
      { face: props.face, back: props.back, key: incrementalKey },
      ...cardsArray,
    ]);
    setIsNewCardDisplayed(false);
  };

  const handleCancelButtonClick = () => {
    setIsNewCardDisplayed(false);
  };



  return (
    <AppLayout>
      <AppHeader
        cardsAmount={cardsArray.length + (isNewCardDisplayed ? 1 : 0)}
        logoURL={logo}
        onClick={handleAddCardButtonClick}
      />
      <div className={styles.renderContainer}>
        {isNewCardDisplayed && (
          <NewCard
            onSave={handleSaveButtonClick}
            onCancel={handleCancelButtonClick}
          />
        )}
        {cardsArray.map((card) => (
          <Card faceValue={card.face} flipValue={card.back} key={card.key} />
        ))}
      </div>
    </AppLayout>
  );
}

export default App;
