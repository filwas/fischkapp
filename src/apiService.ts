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
