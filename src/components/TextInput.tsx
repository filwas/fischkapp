import React, {
  ChangeEventHandler,
  MutableRefObject,
  PropsWithChildren,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./TextInput.module.css";

interface TextProps extends PropsWithChildren {
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
  value?: string;
  ref?: any;
}



export const TextInput = (props: TextProps) => {

  const inputRef = useRef();


  return (
    <textarea
      className={styles.input}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
    >
    </textarea>
  );
};
