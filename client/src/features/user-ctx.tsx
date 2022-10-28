import React, { createContext, useState } from "react";

interface Value {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserCtx = createContext<Value>({
  isAuth: false,
  setIsAuth: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <UserCtx.Provider
      value={{
        isAuth,
        setIsAuth: setIsAuth,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
