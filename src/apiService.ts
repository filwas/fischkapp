// apiService.ts
export const customFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(
      "https://training.nerdbord.io/api/v1/fischkapp/flashcards",
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

// apiService.ts
interface CardObject {
  face: string;
  back: string;
}

export const importCards = async (): Promise<CardObject[]> => {
  try {
    // Use the customFetch function to get the data from the API
    const data = await customFetch<CardObject[]>(""); // Replace '/endpoint' with your actual API endpoint

    // Map the response data to include only the required properties (_id, front, and back)
    const importedCardsArray: CardObject[] = data.map((card) => ({
      face: card.front,
      back: card.back,
    }));

    return importedCardsArray;
  } catch (error) {
    throw error;
  }
};
