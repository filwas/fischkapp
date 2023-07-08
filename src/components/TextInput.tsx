import React, { SyntheticEvent, useEffect } from "react";
import styles from "./TextInput.module.css";

interface TextProps {
  textValue: string;
  disabled?: boolean;
}

export const TextInput = (props: TextProps) => {
    
  const heightFixer = function (event: SyntheticEvent) {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = "19px";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <textarea
      className={styles.input}
      onChange={heightFixer}
      disabled={props.disabled}
    >
      {props.textValue}
    </textarea>
  );
};
