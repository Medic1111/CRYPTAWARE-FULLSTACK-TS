import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TickerProvider from "./features/ticker-ctx";
import SelectionCtxProvider from "./features/selection-ctx";
import ModalProvider from "./features/modal-ctx";
import AuthProvider from "./features/auth-ctx";
import ChartProvider from "./features/chart-ctx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChartProvider>
        <ModalProvider>
          <SelectionCtxProvider>
            <TickerProvider>
              <App />
            </TickerProvider>
          </SelectionCtxProvider>
        </ModalProvider>
      </ChartProvider>
    </AuthProvider>
  </React.StrictMode>
);
