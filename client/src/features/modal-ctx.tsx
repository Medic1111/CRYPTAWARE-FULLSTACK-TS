import React, { createContext, useReducer, useState } from "react";
import ModalRed, {
  ModalState,
  ModalActionType,
  ModalStateType,
} from "../reducers/modal-red";

interface Value {
  state: ModalStateType;
  dispatch: React.Dispatch<ModalActionType>;
  news: any[];
  setNews: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ModalCtx = createContext<Value>({
  state: ModalState,
  dispatch: () => {},
  news: [],
  setNews: () => {},
});

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ModalRed, ModalState);
  const [news, setNews] = useState<any[]>([]);

  return (
    <ModalCtx.Provider
      value={{
        state,
        dispatch: dispatch,
        news,
        setNews,
      }}
    >
      {children}
    </ModalCtx.Provider>
  );
};

export default ModalProvider;
