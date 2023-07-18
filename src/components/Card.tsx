import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";
import {countTextLines} from "./helperFunctions"


interface CardProps {
  /**side A of the card*/
  faceValue: string;
  /**side B of the card*/
  flipValue: string;
  /**unique number */
  id: number;
  /**on delete*/
  onDelete: (index: number) => void;
}

export const Card = (props: CardProps) => {
  // text on side A
  const [faceValue, setFaceValue] = useState(props.faceValue);
  // text on side B
  const [flipValue, setFlipValue] = useState(props.flipValue);
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
    setInputDisplayValue(flipState ? faceValue : flipValue);
  }, [flipState, faceValue, flipValue]);

  
  const initialTextHeight = 20 + countTextLines(faceValue.length > flipValue.length ? faceValue : flipValue) * 19
  const [maxTextHeight, setMaxTextHeight] = useState(initialTextHeight);

  //state and custom event for handling card removal
  const [removeStatus, setRemoveStatus] = useState(false);

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

  const handleSaveButtonClick = (event?: React.MouseEvent) => {
    if (flipState) {
      setFaceValue(inputDisplayValue);
    } else {
      setFlipValue(inputDisplayValue);
    }
    handleEditButtonClick();
    if (event) event.stopPropagation();
  };

  const handleDeleteButtonClick = (event?: React.MouseEvent) => {
    setRemoveStatus(true);
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value);
    const newHeight = target.scrollHeight > maxTextHeight ? target.scrollHeight : maxTextHeight
    target.style.height = `${newHeight}px`;
    setMaxTextHeight(newHeight);
  };



  if (removeStatus) return null;

  if (editEnabled) {
    return (
      <div className={styles.card} onClick={() => {}}>
        <SmallIconButton type={"delete"} onClick={handleDeleteButtonClick} />
        <TextInput
          height={maxTextHeight}
          value={inputDisplayValue}
          onChange={handleTextInputOnChange}
        />
        <div className={styles.buttonWrapper}>
          <BigButton colorToggle={false} onClick={handleCancelButtonClick}>
            Cancel
          </BigButton>
          <BigButton colorToggle={true} onClick={handleSaveButtonClick}>
            Save
          </BigButton>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.card} onClick={handleTap}>
        <SmallIconButton type={"edit"} onClick={handleEditButtonClick} />
        <TextOutput height={maxTextHeight}>
          {flipState ? faceValue : flipValue}
        </TextOutput>
        {/**this second, empty textoutput exists only so that i can simply use
         * a single "justify-content: space-between;" on it's wrapper div
         * to make it look exactly like the project requirements! :D*/}
        <TextOutput></TextOutput>
      </div>
    );
  }
};