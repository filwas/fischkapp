import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";

interface CardObject {
  face: string;
  back: string;
}

interface NewCardProps {
  onSave: (props: CardObject) => void;
  onCancel: () => void;
}

export const NewCard = (props: NewCardProps) => {
  // text on side A
  const [faceValue, setFaceValue] = useState("");
  // text on side B
  const [flipValue, setFlipValue] = useState("");

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

  //state used for changing the height of the text display
  const [textOutputHeight, setTextOutputHeight] = useState(19);

  const handleNextButtonClick = () => {
    setFaceValue(inputDisplayValue);
    setInputDisplayValue("");
    setFlipState(!flipState);
  };
  const handleSaveButtonClick = () => {
    props.onSave({ face: faceValue, back: inputDisplayValue });
    setFaceValue("");
    setInputDisplayValue("");
  };
  const handleBackButtonClick = (event?: React.MouseEvent) => {
    setFlipState(!flipState);
    if (event) event.stopPropagation();
  };

  const handleDeleteButtonClick = (event?: React.MouseEvent) => {
    props.onCancel();
    if (event) event.stopPropagation();
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value);
    target.style.height = `${target.scrollHeight}px`;
    setTextOutputHeight(target.scrollHeight);
  };

  return (
    <div className={styles.card} onClick={() => {}}>
      {flipState ? (
        <TextOutput height={10} />
      ) : (
        <SmallIconButton type={"delete"} onClick={handleDeleteButtonClick} />
      )}
      {!flipState && (
        <TextOutput height={12} className={styles.caption}>
          {faceValue}
        </TextOutput>
      )}
      <TextInput
        height={39}
        value={inputDisplayValue}
        onChange={handleTextInputOnChange}
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
