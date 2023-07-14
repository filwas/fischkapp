import React, { useEffect, useState } from "react";
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
  //and effect for making sure it properly displays
  const [inputDisplayValue, setInputDisplayValue] = useState(
    flipState ? faceValue : flipValue
  );
  useEffect(() => {
    setInputDisplayValue(flipState ? tempFaceValue : flipValue);
  }, [flipState, faceValue, flipValue, tempFaceValue]);


  function handleTap() {
    setFlipState(!flipState);
  }

  function handleEditButtonClick(event?: React.MouseEvent) {
    setEditEnabled(!editEnabled);
    event && event.stopPropagation();
  }

  const handleCancelButtonClick = () => {
    handleEditButtonClick();
  };

  const handleNextButtonClick = () => {
    setTempFaceValue(inputDisplayValue)
    handleTap();
  };
  const handleSaveButtonClick = (event: React.MouseEvent) => {
    setFaceValue(tempFaceValue);
    setFlipValue(inputDisplayValue);
    handleEditButtonClick();
    event.stopPropagation();
  };
  const handleBackButtonClick = (event: React.MouseEvent) => {
    handleTap();
    event.stopPropagation();
  };
  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    props.onDelete();
    event.stopPropagation();
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
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
          onClick={editEnabled ? handleDeleteButtonClick : handleEditButtonClick}
        />
        {!flipState && <TextOutput className={styles.caption}>{tempFaceValue}</TextOutput>}
        <TextInput value={inputDisplayValue} onChange={handleTextInputOnChange} />
        <div className={styles.buttonWrapper}>
          <BigButton
            colorToggle={false}
            onClick={flipState ? handleCancelButtonClick : handleBackButtonClick}
          >
            {flipState ? "Cancel" : "Back"}
          </BigButton>
          <BigButton
            colorToggle={true}
            onClick={flipState ? handleNextButtonClick : handleSaveButtonClick}
          >
            {flipState ? "Next" : "Save"}
          </BigButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.card} onClick={handleTap}>
        <SmallIconButton
          type={editEnabled ? "delete" : "edit"}
          onClick={handleEditButtonClick}
        />
        <TextOutput>{flipState ? faceValue : flipValue}</TextOutput>
      </div>
    );
  }
};
