import React, { PropsWithChildren } from "react";
import styles from "./AddNewCardButton.module.css";
import addNew from "../assets/addNew.svg";

interface AddNewCardButtonProps extends PropsWithChildren{
  onClick(): void;
}
export const NewCardButton = (props: AddNewCardButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <img src={addNew} />
    </button>
  );
};
