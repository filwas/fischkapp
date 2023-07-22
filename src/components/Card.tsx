import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";
import { countTextLines } from "./helperFunctions";
import { CardObject } from "../types/types";

interface CardProps {
  /**side A of the card*/
  faceValue: string;
  /**side B of the card*/
  flipValue: string;
  /**text height */
  textHeight?: number;
  /**identificator */
  id: string;
  /**delete handler */
  onDelete: (id: string) => void;
  /**patch handler */
  onUpdate: (card: CardObject) => void;
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

  const [playAnimation, setPlayAnimation] = useState(false);


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
    setPlayAnimation(true);
    setTimeout(() => {
      setFlipState(!flipState);
    }, 200);
    setTimeout(() => {
      setPlayAnimation(false);
    }, 400);

  }

  function handleEditButtonClick(event?: React.MouseEvent) {
    event && event.stopPropagation();
    setEditEnabled(!editEnabled);
  }

  const handleCancelButtonClick = () => {
    handleEditButtonClick();
  };

  const handleSaveButtonClick = async (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    if (flipState) {
      props.onUpdate({
        id: props.id,
        face: inputDisplayValue,
        back: flipValue
      })
      setFaceValue(inputDisplayValue);
    } else {
      props.onUpdate({
        id: props.id,
        face: faceValue,
        back: inputDisplayValue
      })
      setFlipValue(inputDisplayValue);
    }
    handleEditButtonClick();
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value);
  };

  const dynamicClasses = [
    styles.card,
    playAnimation ? styles.flipVerticalRight : "",
  ].join(" ")

  const handleDeleteButtonClick = (event?: React.MouseEvent) => {
    props.onDelete(props.id)
    //somehow deleting a card enabled edit mode on the next 
    //card, and using the setter here stops this behaviour
    //should this be moved into a useEffect or something?
    setEditEnabled(!editEnabled);
    if (event) event.stopPropagation();
  }

  useEffect(() => {
    let linesAmount = countTextLines(inputDisplayValue)
    let calculatedHeight = 20 + (linesAmount * 19);
    if (calculatedHeight > maxTextHeight) setMaxTextHeight(calculatedHeight)
  }, [inputDisplayValue])



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
      <div className={dynamicClasses} onClick={handleTap}>
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
