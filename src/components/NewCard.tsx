import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";
import { countTextLines } from "./helperFunctions";
import { CardObject } from "../types/types";

interface NewCardProps {
  onSave: (props: CardObject) => void;
  onCancel: () => void;
}

export const NewCard = (props: NewCardProps) => {
  // text on side A
  const [faceValue, setFaceValue] = useState("");
  // text on side B

  //flipState on = side A displayed, flipState off = side B
  const [flipState, setFlipState] = useState(true);

  //state used for controlling the default display of input
  //and effect for making sure it properly displays
  const [inputDisplayValue, setInputDisplayValue] = useState(
    flipState ? faceValue : ""
  );

  useEffect(() => {
    setInputDisplayValue(flipState ? faceValue : "");
  }, [flipState, faceValue]);

  const [textHeight, setTextHeight] = useState(39);

  const textInputRef = useRef<HTMLTextAreaElement>(null);


  const handleNextButtonClick = () => {
    setFaceValue(inputDisplayValue);
    setInputDisplayValue("");
    textInputRef.current?.focus();
    setFlipState(!flipState);
  };
  const handleSaveButtonClick = () => {
    props.onSave({ face: faceValue, back: inputDisplayValue, id: "" });
    setFaceValue("");
    setInputDisplayValue("");
  };
  const handleBackButtonClick = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setFlipState(!flipState);
    setInputDisplayValue(faceValue);
  };

  const handleDeleteButtonClick = (event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    props.onCancel();
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value);
  };

  useEffect(() => {
    let linesAmount = countTextLines(inputDisplayValue);
    let calculatedHeight = 20 + linesAmount * 19;
    setTextHeight(calculatedHeight);
  }, [inputDisplayValue]);

  return (
    <div className={styles.card} onClick={() => {}}>
      {flipState ? (
        <TextOutput height={10} />
      ) : (
        <SmallIconButton type={"delete"} onClick={handleDeleteButtonClick} />
      )}
      {!flipState && (
        <TextOutput className={styles.caption}>{faceValue}</TextOutput>
      )}
      <TextInput
        height={textHeight}
        value={inputDisplayValue}
        onChange={handleTextInputOnChange}
        ref={textInputRef}
      />
      <div className={styles.buttonWrapper}>
        <BigButton
          colorToggle={false}
          onClick={flipState ? handleDeleteButtonClick : handleBackButtonClick}
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
};
