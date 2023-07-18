export function countTextLines(text: string) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  
    context.font = "16px Lexend";
    const words = text.split(" ");
    let line = "";
    let lines = 0;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 311 && i > 0) {
        lines++;
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines++;
  
    return lines;
  }