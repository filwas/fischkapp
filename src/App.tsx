import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import logo from "../public/FischLogo.svg";

import styles from "./App.module.css";
import { Card } from "./components/Card";
import { JSX, useState } from "react";
import { NewCard } from "./components/NewCard";

interface AppProps {
  basicCards?: { face: string; back: string }[];
}
function App(props: AppProps) {
  let basicCards: JSX.Element[] = [];

  props.basicCards && props.basicCards.forEach((cardData, cardIndex) => {
    basicCards.push(<Card faceValue={cardData.face} flipValue={cardData.back} key={cardIndex+1} />)
  });

  const [cardsArray, setCardsArray] = useState(basicCards)

  const handleAddCardButtonClick = () => {
    setCardsArray([<NewCard key={cardsArray.length+1} />, ...cardsArray])
  };

  return (
    <AppLayout>
      <AppHeader
        cardsAmount={basicCards.length}
        logoURL={logo}
        onClick={handleAddCardButtonClick}
      />
      <div className={styles.renderContainer}>{cardsArray}</div>
    </AppLayout>
  );
}

export default App;
