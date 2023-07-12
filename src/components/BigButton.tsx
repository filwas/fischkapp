import React, { PropsWithChildren } from "react";
import styles from "./BigButton.module.css";

interface BigButtonProps extends PropsWithChildren {
    /**Toggle ON returns a black button, OFF returns a white one. */
  colorToggle: boolean;
  onClick(): void;
}
export const BigButton = (props: BigButtonProps) => {
  const dynamicClasses = [
    styles.button,
    props.colorToggle ? styles.black : styles.white,
  ].join(" ");

  return (
    <button className={dynamicClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
