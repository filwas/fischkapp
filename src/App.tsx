import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { JSX, useEffect, useState } from "react";
import { NewCard } from "./components/NewCard";

interface AppProps {
  basicCards?: { face: string; back: string }[];
}
function App(props: AppProps) {
  let basicCards: JSX.Element[] = [];

  const [cardsArray, setCardsArray] = useState(basicCards);
  const [incrementalKey, setIncrementalKey ] = useState(props.basicCards?.length || 0)

  useEffect(() => {
    setIncrementalKey(prevKey => prevKey +1)
  }, [cardsArray, setCardsArray])


  const handleDeleteCard = (id:number) => {
    setCardsArray(prevCardsArray => {
      const updatedCards = prevCardsArray.filter(e => e.props.id !== id);
      return updatedCards
    })
  };

  props.basicCards &&
  props.basicCards.forEach((cardData, currentIndex) => {
    basicCards.push(
      <Card
        onDelete={handleDeleteCard}
        faceValue={cardData.face}
        flipValue={cardData.back}
        key={currentIndex}
        id={Math.random()}
      />
    );
  });

  const handleAddCardButtonClick = () => {
    setCardsArray([
      <NewCard
        key={incrementalKey}
        id={Math.random()}
        onDelete={handleDeleteCard}
      />,
      ...cardsArray,
    ]);
  };



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
