import React, { useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";

interface CardProps {
  onDelete: ()=>void;
  key: number
}

export const Card = (props: CardProps) => {
  // text on side A
  const [faceValue, setFaceValue] = useState("");
  const [tempFaceValue, setTempFaceValue] = useState(faceValue);
  // text on side B
  const [flipValue, setFlipValue] = useState("");

  //wether we're editing the card
  const [editEnabled, setEditEnabled] = useState(false);

  //flipState on = side A displayed, flipState off = side B
  const [flipState, setFlipState] = useState(true);

  //state used for controlling the default display of input
  const [inputDisplayValue, setInputDisplayValue] = useState(
    flipState ? faceValue : flipValue
  );

  function tapHandler() {
    setFlipState(!flipState);
  }

  function editHandler(event?: React.MouseEvent) {
    setEditEnabled(!editEnabled);
    setInputDisplayValue(flipState ? tempFaceValue : flipValue);
    event && event.stopPropagation();
  }

  const cancelClick = () => {
    editHandler();
  };

  const nextClick = () => {
    setTempFaceValue(inputDisplayValue)
    tapHandler();
    setInputDisplayValue(flipValue);
  };
  const saveClick = (event: React.MouseEvent) => {
    setFaceValue(tempFaceValue);
    setFlipValue(inputDisplayValue);
    editHandler();
    event.stopPropagation();
  };
  const backClick = (event: React.MouseEvent) => {
    tapHandler();
    setInputDisplayValue(tempFaceValue);
    event.stopPropagation();
  };
  const deleteClick = (event: React.MouseEvent) => {
    props.onDelete();
    event.stopPropagation();
  };

  const textInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value)
    target.style.height = "19px";
    target.style.height = `${target.scrollHeight}px`;
  };

  if (editEnabled) {
    return (
      <div className={styles.card} onClick={() => {}} key={props.key}>
        <SmallIconButton
          type={editEnabled ? "delete" : "edit"}
          onClick={editEnabled ? deleteClick : editHandler}
        />
        {!flipState && <TextOutput className={styles.caption}>{tempFaceValue}</TextOutput>}
        <TextInput value={inputDisplayValue} onChange={textInputOnChange} />
        <div className={styles.buttonWrapper}>
          <BigButton
            colorToggle={false}
            onClick={flipState ? cancelClick : backClick}
          >
            {flipState ? "Cancel" : "Back"}
          </BigButton>
          <BigButton
            colorToggle={true}
            onClick={flipState ? nextClick : saveClick}
          >
            {flipState ? "Next" : "Save"}
          </BigButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.card} onClick={tapHandler}>
        <SmallIconButton
          type={editEnabled ? "delete" : "edit"}
          onClick={editHandler}
        />
        <TextOutput>{flipState ? faceValue : flipValue}</TextOutput>
      </div>
    );
  }
};
