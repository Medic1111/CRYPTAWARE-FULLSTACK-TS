import React, { createContext, useReducer } from "react";
import UserRed, {
  UserActionType,
  UserInitState,
  UserStateType,
} from "../reducers/user-red";

interface Value {
  state: UserStateType;
  dispatch: React.Dispatch<UserActionType>;
}

export const UserCtx = createContext<Value>({
  state: UserInitState,
  dispatch: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(UserRed, UserInitState);

  return (
    <UserCtx.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
