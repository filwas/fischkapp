import React, { PropsWithChildren } from "react";
import styles from "./AppLayout.module.css";

export const AppLayout = ({ ...props }: PropsWithChildren) => {
  return <div className={styles.layout}>{props.children}</div>;
};
