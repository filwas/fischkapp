import React, { PropsWithChildren } from "react";
import styles from "./TextOutput.module.css";

interface TextOutputProps extends PropsWithChildren {
  className?: string;
}

export const TextOutput = (props: TextOutputProps) => {
  return (
    <div className={props.className ? props.className : styles.output}>
      {props.children}
    </div>
  );
};
