import React, { PropsWithChildren } from "react";
import styles from "./TextOutput.module.css";

interface TextOutputProps extends PropsWithChildren {
  className?: string;
  height?: number;
}

export const TextOutput = (props: TextOutputProps) => {
  return (
    <div
      className={props.className ? props.className : styles.output}
      style={  { height: props.height ? props.height + "px" : "" }}
    >
      {props.children}
    </div>
  );
};
