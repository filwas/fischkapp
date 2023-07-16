import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";

interface CardProps {
  /**side A of the card*/
  faceValue?: string;
  /**side B of the card*/
  flipValue?: string;
  /**text height */
  textHeight?: number;
  /**unique number */
  id: number;
  /**on delete*/
  onDelete: (index: number) => void;
}

export const Card = (props: CardProps) => {
  // text on side A
  const [faceValue, setFaceValue] = useState(
    props.faceValue ? props.faceValue : ""
  );
  // text on side B
  const [flipValue, setFlipValue] = useState(
    props.flipValue ? props.flipValue : ""
  );

  //wether we're editing the card
  const [editEnabled, setEditEnabled] = useState(false);

  //flipState on = side A displayed, flipState off = side B
  const [flipState, setFlipState] = useState(true);

  //state used for controlling the default display of input
  //and effect for making sure it properly displays
  const [inputDisplayValue, setInputDisplayValue] = useState(
    flipState ? faceValue : flipValue
  );

  const [playAnimation, setPlayAnimation] = useState(false);


  useEffect(() => {
    setInputDisplayValue(flipState ? faceValue : flipValue);
  }, [flipState, faceValue, flipValue]);

  //state used for changing the height of the text display
  const [textOutputHeight, setTextOutputHeight] = useState(
    props.textHeight ? props.textHeight : 19
  );

  function handleTap() {
    setPlayAnimation(true);
    setTimeout(() => {
      setFlipState(!flipState);
    }, 200);
    setTimeout(() => {
      setPlayAnimation(false);
    }, 400);

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

  const handleDeleteButtonClick = () => {
    props.onDelete(props.id)
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value);
    target.style.height = `${target.scrollHeight}px`;
    setTextOutputHeight(target.scrollHeight);
  };

  const dynamicClasses = [
    styles.card,
    playAnimation ? styles.flipVerticalRight : "",
  ].join(" ")


  if (editEnabled) {
    return (
      <div className={styles.card} onClick={() => {}}>
        <SmallIconButton type={"delete"} onClick={handleDeleteButtonClick} />
        <TextInput
          height={textOutputHeight}
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
      <div className={dynamicClasses} onClick={handleTap}>
        <SmallIconButton type={"edit"} onClick={handleEditButtonClick} />
        <TextOutput height={textOutputHeight}>
          {flipState ? faceValue : flipValue}
        </TextOutput>
        {/**this second, empty textoutput exists only so that i can simply use
         * a single "justify-content: space-between;" on it's wrapper div
         * to make it look exactly like the project requirements! :D*/}
        <TextOutput height={19}></TextOutput>
      </div>
    );
  }
};
