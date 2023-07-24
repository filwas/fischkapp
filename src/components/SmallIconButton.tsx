import React from "react";
import styles from "./SmallIconButton.module.css";
import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";

interface ButtonProps {
  type: "edit" | "delete";
  onClick: (event: React.MouseEvent) => void;
}
export const SmallIconButton = (props: ButtonProps) => {
    const imageSource = props.type == "edit" ? editIcon : deleteIcon;
  return (
    <button className={styles.button} onClick={props.onClick}>
      <img src={imageSource} />
    </button>
  );
};
