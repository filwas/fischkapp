export function countTextLines(text: string) {
  const words = text.split(" ");
  let line = "";
  let lines = 1;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";

    if (measureText(testLine) > 287 && i > 0) {
      lines++;
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }

  return lines;
}

function measureText(text: string) {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.fontSize = "16px";
  div.style.fontFamily = "Lexend";
  div.textContent = text;
  document.body.appendChild(div);
  const width = div.clientWidth;
  document.body.removeChild(div);
  return width;
}