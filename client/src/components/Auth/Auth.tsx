import axios from "axios";
import React, { useContext } from "react";
import { UserCtx } from "../../features/user-ctx";
import classes from "./Auth.module.css";

const Auth: React.FC = () => {
  const userMgr = useContext(UserCtx);

  const ApiLogin = async (e: React.FormEvent<HTMLInputElement>) => {
    let cancelToken = axios.CancelToken.source();

    let url: string;
    userMgr.isLoggin ? (url = "login") : (url = "register");

    e.preventDefault();
    axios
      .post(
        `/api/v1/${url}`,
        { user: userMgr.credentials },
        { cancelToken: cancelToken.token }
      )
      .then((serverRes) => {
        console.log(serverRes);
        userMgr.setIsAuth(true);
      })
      .catch((err) => {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
      });

    return () => cancelToken.cancel();
  };

  return (
    <article className={classes.article}>
      <form className={classes.form}>
        {userMgr.isLoggin || (
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            required
            value={userMgr.credentials.email}
            name="email"
            onChange={userMgr.onCredentialsChange}
          />
        )}
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          required
          value={userMgr.credentials.username}
          name="username"
          onChange={userMgr.onCredentialsChange}
        />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          min={6}
          required
          value={userMgr.credentials.password}
          name="password"
          onChange={userMgr.onCredentialsChange}
        />
        <input
          onClick={ApiLogin}
          className={classes.submit}
          type="submit"
          value={userMgr.isLoggin ? "Login" : "Register"}
        />
        <span
          onClick={() => {
            userMgr.resetCredentials();
            userMgr.setIsLoggin((prev) => !prev);
          }}
          className={classes.span}
        >
          {userMgr.isLoggin
            ? "Not registered? Register now"
            : " Already registered? Login now"}
        </span>
      </form>
    </article>
  );
};

export default Auth;
