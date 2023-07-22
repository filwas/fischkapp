const APISTRING = "https://training.nerdbord.io/api/v1/fischkapp/"

export const customFetch = async <T>(
  endpointUrl: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(
      APISTRING+endpointUrl,
      options
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
};



interface CardObject {
  face: string;
  back: string;
  id: string;
}

interface ImportedCardObject {
  front: string;
  back: string;
  _id: string;
}

export const importCards = async (): Promise<CardObject[]> => {
  try {
    const data = await customFetch<ImportedCardObject[]>("");

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

