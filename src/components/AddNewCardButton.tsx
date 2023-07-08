import React from "react";
import styles from "./AddNewCardButton.module.css";
import addNew from "../../public/addNew.svg";

interface ButtonProps {
  onClick(): void;
}
export const NewCardButton = (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <img src={addNew} />
    </button>
  );
};
