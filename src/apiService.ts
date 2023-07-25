import { CardObject } from "./types/types";
const APIURL = "https://training.nerdbord.io/api/v1/fischkapp";

export const customFetch = async <T>(
  endpointUrl: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(APIURL + endpointUrl, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
};

interface ImportedCardWrapper {
  flashcard: ImportedCardObject;
}

interface ImportedCardObject {
  front: string;
  back: string;
  _id: string;
}

export const fetchCards = async (): Promise<CardObject[]> => {
  try {
    const data = await customFetch<ImportedCardObject[]>("/flashcards");

    //changing the ImportedCardObject into CardObject
    const importedCardsArray: CardObject[] = data.map((card) => ({
      face: card.front,
      back: card.back,
      id: card._id,
    }));

    return importedCardsArray;
  } catch (error) {
    throw error;
  }
};

export const uploadNewCard = async (card: CardObject): Promise<CardObject> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: "secret_token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        front: card.face,
        back: card.back,
      }),
    };

    //this fetch weirdly returns a different object than fetchCards method,
    //therefore I've added a new interface called ImportedCardWrapper
    return customFetch("/flashcards", options)
      .then((newCard) => {
        let returnCard: CardObject = {
          id: (newCard as ImportedCardWrapper).flashcard._id,
          face: (newCard as ImportedCardWrapper).flashcard.front,
          back: (newCard as ImportedCardWrapper).flashcard.back,
        };
        return returnCard;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  } catch (error) {
    throw error;
  }
};

export const patchCard = async (card: CardObject): Promise<void> => {
  try {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        Authorization: "secret_token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: card.id,
        front: card.face,
        back: card.back,
      }),
    };

    await customFetch("/flashcards/"+card.id, options);
  } catch (error) {
    throw error;
  }
};