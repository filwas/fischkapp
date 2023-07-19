import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";
import { countTextLines } from "./helperFunctions";

interface CardProps {
  /**side A of the card*/
  faceValue: string;
  /**side B of the card*/
  flipValue: string;
  /**text height */
  textHeight?: number;
  onDelete: () => void;
}

export const Card = (props: CardProps) => {
  // text on side A$
  const [faceValue, setFaceValue] = useState("");
  // text on side B
  const [flipValue, setFlipValue] = useState("");
  //wether we're editing the card
  const [editEnabled, setEditEnabled] = useState(false);
  //flipState on = side A displayed, flipState off = side B
  const [flipState, setFlipState] = useState(true);

  const [inputDisplayValue, setInputDisplayValue] = useState(
    flipState ? faceValue : flipValue
  );

  useEffect(() => {
    setInputDisplayValue(flipState ? faceValue : flipValue);
  }, [flipState, faceValue, flipValue]);

  useEffect(() => {
    setFaceValue(props.faceValue);
  }, [props.faceValue]);

  useEffect(() => {
    setFlipValue(props.flipValue);
  }, [props.flipValue]);

  const initialTextHeight =
    20 +
    countTextLines(
      props.faceValue.length > props.flipValue.length ? props.faceValue : props.flipValue
    ) *
      19;
  const [maxTextHeight, setMaxTextHeight] = useState(initialTextHeight);

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

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value.trim());
  };

  useEffect(() => {
    let linesAmount = countTextLines(inputDisplayValue)
    let calculatedHeight = 20 + (linesAmount * 19);
    if (calculatedHeight > maxTextHeight) setMaxTextHeight(calculatedHeight)
  }, [inputDisplayValue])

  if (editEnabled) {
    return (
      <div className={styles.card} onClick={() => {}}>
        <SmallIconButton type={"delete"} onClick={props.onDelete} />
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
