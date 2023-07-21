import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const CARDSMEMORY = [
  { face: "a", back: "b" },
  { face: "c", back: "d" },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
