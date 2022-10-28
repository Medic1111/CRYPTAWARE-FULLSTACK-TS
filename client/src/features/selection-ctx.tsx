import React, { createContext, useReducer } from "react";
import SelectionReducer, {
  SelectionInitialState,
  SelectionAction,
  SelectionState,
} from "../reducers/selection-red";

interface Value {
  SelDispatch: React.Dispatch<SelectionAction>;
  SelState: SelectionState;
}

export const SelectionCtx = createContext<Value>({
  SelState: SelectionInitialState,
  SelDispatch: () => {},
});

const SelectionCtxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [SelState, SelDispatch] = useReducer(
    SelectionReducer,
    SelectionInitialState
  );

  return (
    <SelectionCtx.Provider
      value={{
        SelState,
        SelDispatch: SelDispatch,
      }}
    >
      {children}
    </SelectionCtx.Provider>
  );
};

export default SelectionCtxProvider;
