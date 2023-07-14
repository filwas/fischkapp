import React from "react";
import styles from "./AppHeader.module.css";
import { NewCardButton } from "./AddNewCardButton";
interface HeaderProps {
  cardAmount: Number;
  logoURL: string;
  onClick: ()=>void;
}

export const AppHeader = (props: HeaderProps) => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={props.logoURL} alt="FischkApp logo" />
      <div className={styles.textWrap}>
        <span className={styles.text}>
          Cards: <>{props.cardAmount}</>
        </span>
      </div>
      <div className={styles.buttonWrap}><NewCardButton onClick={props.onClick} /></div>
    </header>
  );
};
