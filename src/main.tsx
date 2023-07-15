import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const CARDSMEMORY = [{ face: "FRONT", back: "BACK" }];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App basicCards={CARDSMEMORY} />
  </React.StrictMode>
);
