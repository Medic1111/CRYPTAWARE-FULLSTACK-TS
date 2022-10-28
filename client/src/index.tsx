import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TickerProvider from "./features/ticker-ctx";
import SelectionCtxProvider from "./features/selection-ctx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SelectionCtxProvider>
      <TickerProvider>
        <App />
      </TickerProvider>
    </SelectionCtxProvider>
  </React.StrictMode>
);
