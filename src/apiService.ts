const APISTRING = "https://training.nerdbord.io/api/v1/fischkapp/flashcards";

export const customFetch = async <T>(
  endpointUrl: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(APISTRING + endpointUrl, options);

    if (!response.ok) {
      console.log(response);
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

export const exportCard = async (card: CardObject): Promise<void> => {
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

    await customFetch("", options);
  } catch (error) {
    throw error;
  }
};
