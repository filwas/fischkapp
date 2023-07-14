import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";
import { TextOutput } from "./TextOutput";
import { BigButton } from "./BigButton";

interface CardProps {
  cardsAmount: number;
  setCardsAmount: Dispatch<SetStateAction<number>>;
}

export const Card = (props: CardProps) => {
  // text on side A
  const [faceValue, setFaceValue] = useState("");
  const [tempFaceValue, setTempFaceValue] = useState(faceValue);
  // text on side B
  const [flipValue, setFlipValue] = useState("");

  //wether we're editing the card
  const [editEnabled, setEditEnabled] = useState(true);

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
    if (faceValue === "" && flipValue === "") {
      handleDeleteButtonClick();
    } else {
      handleEditButtonClick();
    }
  };

  const handleNextButtonClick = () => {
    setTempFaceValue(inputDisplayValue);
    handleTap();
  };
  const handleSaveButtonClick = (event?: React.MouseEvent) => {
    setFaceValue(tempFaceValue);
    setFlipValue(inputDisplayValue);
    handleEditButtonClick();
    if (event) event.stopPropagation();
  };
  const handleBackButtonClick = (event?: React.MouseEvent) => {
    handleTap();
    if (event) event.stopPropagation();
  };

  const handleDeleteButtonClick = (event?: React.MouseEvent) => {
    props.setCardsAmount(props.cardsAmount - 1);
    setRemoveStatus(true);
    if (event) event.stopPropagation();
  };

  const handleTextInputOnChange = function (event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    setInputDisplayValue(target.value);
    target.style.height = "19px";
    target.style.height = `${target.scrollHeight}px`;
  };

  if (removeStatus) return null;

  if (editEnabled) {
    return (
      <div className={styles.card} onClick={() => {}}>
        <SmallIconButton
          type={"delete"}
          onClick={
            editEnabled ? handleDeleteButtonClick : handleEditButtonClick
          }
        />
        {!flipState && (
          <TextOutput className={styles.caption}>{tempFaceValue}</TextOutput>
        )}
        <TextInput
          value={inputDisplayValue}
          onChange={handleTextInputOnChange}
        />
        <div className={styles.buttonWrapper}>
          <BigButton
            colorToggle={false}
            onClick={
              flipState ? handleCancelButtonClick : handleBackButtonClick
            }
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
        <SmallIconButton type={"edit"} onClick={handleEditButtonClick} />
        <TextOutput>{flipState ? faceValue : flipValue}</TextOutput>
        {/**this second, empty textoutput exists only so that i can simply use
         * a single "justify-content: space-between;" on it's wrapper div
         * to make it look exactly like the project requirements! :D*/}
        <TextOutput></TextOutput>
      </div>
    );
  }
};
