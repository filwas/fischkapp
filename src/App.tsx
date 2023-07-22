import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { NewCard } from "./components/NewCard";
import React from "react";
import { exportCard, importCards } from "./apiService";


interface CardObject {
  face: string;
  back: string;
  id: string;
}


function App() {
  const [cardsArray, setCardsArray] = useState<CardObject[]>([]);
  const [isNewCardDisplayed, setIsNewCardDisplayed] = useState(false);

  const handleAddCardButtonClick = () => {
    setIsNewCardDisplayed(true);
  };

  const handleSaveButtonClick = async (card: CardObject) => {

    await exportCard(card)

    setIsNewCardDisplayed(false);
  };

  const handleCancelButtonClick = () => {
    setIsNewCardDisplayed(false);
  };

  const handleDeleteButtonClick = (id: string) => {
    const newCardsArray = cardsArray.filter((card) => card.id != id)
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
          <Card faceValue={card.face} flipValue={card.back} key={index} id={card.id} onDelete={handleDeleteButtonClick} />
        ))}
      </div>
    </AppLayout>
  );
}

export default App;
