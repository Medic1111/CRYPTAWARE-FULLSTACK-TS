import React, { createContext, useState } from "react";
import { Credentials } from "../models/Credentials";

interface Value {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  isLoggin: boolean;
  setIsLoggin: React.Dispatch<React.SetStateAction<boolean>>;
  credentials: Credentials;
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>;
  resetCredentials: () => void;
  onCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserCtx = createContext<Value>({
  isAuth: false,
  setIsAuth: () => {},
  logout: () => {},
  isLoggin: true,
  setIsLoggin: () => {},
  credentials: { email: "", username: "", password: "" },
  setCredentials: () => {},
  resetCredentials: () => {},
  onCredentialsChange: (e) => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggin, setIsLoggin] = useState(true);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    username: "",
    password: "",
  });

  const resetCredentials = () =>
    setCredentials({
      email: "",
      username: "",
      password: "",
    });

  const logout = () => {
    setIsAuth(false);
  };

  const onCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <UserCtx.Provider
      value={{
        isAuth,
        setIsAuth: setIsAuth,
        logout: logout,
        isLoggin,
        setIsLoggin: setIsLoggin,
        credentials,
        setCredentials,
        resetCredentials: resetCredentials,
        onCredentialsChange: onCredentialsChange,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};

export default UserProvider;
