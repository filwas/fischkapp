import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { JSX, useEffect, useState } from "react";
import { NewCard } from "./components/NewCard";
import React from "react";


interface CardObject {
  face: string;
  back: string;
}

//obviously this will be gone when i'll implement fetch and stuff.
//it was previously provided via props, no real reason, it was just
//a proof of concept that the app will accept such array of incoming
//cards in the future.
const CARDSMEMORY = [
  { face: "a", back: "b" },
  { face: "c", back: "d" },
];

function App() {
  const [cardsArray, setCardsArray] = useState<CardObject[]>([]);
  const [isNewCardDisplayed, setIsNewCardDisplayed] = useState(false);

  const handleAddCardButtonClick = () => {
    setIsNewCardDisplayed(true);
  };

  const handleSaveButtonClick = (card: CardObject) => {
    setCardsArray([
      { face: card.face, back: card.back },
      ...cardsArray,
    ]);    
    setIsNewCardDisplayed(false);
  };

  const handleCancelButtonClick = () => {
    setIsNewCardDisplayed(false);
  };

  const handleDeleteButtonClick = (id: number) => {
    const newCardsArray = cardsArray.filter((_, index) => index != id)
    setCardsArray(newCardsArray)
  }
  
  useEffect(() => {
    importCards().then((importedCardsArray) => {
      setCardsArray(importedCardsArray)
    })
    .catch((error) => {
      console.error("Error fetching cards", error)
    })
  }, [])
  

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
        {cardsArray.map((card, index) => (
          <Card faceValue={card.face} flipValue={card.back} key={index} id={index} onDelete={handleDeleteButtonClick} />
        ))}
      </div>
    </AppLayout>
  );
}

export default App;
