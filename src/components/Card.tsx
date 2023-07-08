import React, { useState } from "react";
import styles from "./Card.module.css";
import { TextInput } from "./TextInput";
import { SmallIconButton } from "./SmallIconButton";

interface CardProps {
    faceValue?: string;
    flipValue?: string;
}

export const Card = (props: CardProps) => {

    const [faceValue, setFaceValue] = useState("")
    const [flipValue, setFlipValue] = useState("")
    const [editEnabled, setEditEnabled] = useState(false)
    const [flipState, setFlipState] = useState(false)

    function tapHandler(){
        setEditEnabled(!editEnabled)
    }

    function editHandler(){

    }
  return (
    <div className={styles.card} onClick={tapHandler}>
      <SmallIconButton type={editEnabled ? "delete" : "edit"} onClick={()=>{}}/>
      <TextInput textValue={faceValue}/>
      <SmallIconButton type="edit" onClick={()=>{}}/>
    </div>
  );
};
