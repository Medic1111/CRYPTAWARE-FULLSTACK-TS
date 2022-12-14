import React, { createContext, useContext, useState } from "react";
import { Credentials } from "../models/Credentials";
import axios from "axios";
import { UserCtx } from "./user-ctx";
import { TickerCtx } from "./ticker-ctx";

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
  authHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  isTokenExp: () => void;
}

export const AuthCtx = createContext<Value>({
  isAuth: false,
  setIsAuth: () => {},
  logout: () => {},
  isLoggin: true,
  setIsLoggin: () => {},
  credentials: { email: "", username: "", password: "" },
  setCredentials: () => {},
  resetCredentials: () => {},
  onCredentialsChange: (e) => {},
  authHandler: (e) => {},
  isTokenExp: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const tickerMgr = useContext(TickerCtx);
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
    localStorage.removeItem("userValidation");
    setIsAuth(false);
    resetCredentials();
  };

  const onCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const authHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    let cancelToken = axios.CancelToken.source();

    let url: string;
    isLoggin ? (url = "login") : (url = "register");

    userMgr.dispatch({ type: "FETCHING" });

    e.preventDefault();
    await axios
      .post(
        `/api/v1/${url}`,
        { user: credentials },
        { cancelToken: cancelToken.token }
      )
      .then((serverRes) => {
        setIsAuth(true);
        const { username, bookmarkList, notes, token } = serverRes.data;

        if (bookmarkList.length >= 1) {
          tickerMgr.setTickerArr(bookmarkList);
          tickerMgr.setTicker(bookmarkList[0]);
          tickerMgr.setBookMarked(true);
        }

        userMgr.dispatch({
          type: "SUCCESS",
          payload: { username, bookmarkList, notes, token },
        });

        const myExp = new Date(new Date().getTime() + 161 * 60 * 60);
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            username: serverRes.data.username,
            token: serverRes.data.token,
            expiration: myExp.toISOString(),
          })
        );
      })
      .catch((err) => {
        userMgr.dispatch({
          type: "ERROR",
          payload: { errorMsg: err.response.data.message },
        });
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
      });

    return () => cancelToken.cancel();
  };

  const isTokenExp = () => {
    const storedData = localStorage.getItem("userValidation");

    if (typeof storedData === "string") {
      const parse = JSON.parse(storedData);

      if (parse && new Date(parse.expiration) > new Date()) {
        return setIsAuth(true);
      } else {
        return setIsAuth(false);
      }
    }
  };

  return (
    <AuthCtx.Provider
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
        authHandler,
        isTokenExp,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
