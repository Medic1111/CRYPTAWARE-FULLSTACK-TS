import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TickerProvider from "./features/ticker-ctx";
import SelectionCtxProvider from "./features/selection-ctx";
import ModalProvider from "./features/modal-ctx";
import UserProvider from "./features/user-ctx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <SelectionCtxProvider>
          <TickerProvider>
            <App />
          </TickerProvider>
        </SelectionCtxProvider>
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>
);
