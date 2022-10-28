import React, { createContext, useReducer } from "react";
import ModalRed, {
  ModalState,
  ModalActionType,
  ModalStateType,
} from "../reducers/modal-red";

interface Value {
  state: ModalStateType;
  dispatch: React.Dispatch<ModalActionType>;
}

export const ModalCtx = createContext<Value>({
  state: ModalState,
  dispatch: () => {},
});

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ModalRed, ModalState);

  return (
    <ModalCtx.Provider
      value={{
        state,
        dispatch: dispatch,
      }}
    >
      {children}
    </ModalCtx.Provider>
  );
};

export default ModalProvider;
