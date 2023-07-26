import React, { LegacyRef, PropsWithChildren } from "react";
import styles from "./TextInput.module.css";

interface TextProps extends PropsWithChildren {
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
  value?: string;
  height: number;
}

export const TextInput = React.forwardRef((props: TextProps, ref: LegacyRef<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={styles.input}
      ref={ref}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
      autoFocus={true}
      style={{height: props.height ? props.height + "px" : "" }}
    ></textarea>
  );
});
