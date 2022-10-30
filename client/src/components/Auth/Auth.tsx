import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { UserCtx } from "../../features/user-ctx";
import classes from "./Auth.module.css";

const Auth: React.FC = () => {
  const authMgr = useContext(AuthCtx);
  const userMgr = useContext(UserCtx);

  return (
    <article className={classes.article}>
      <form className={classes.form}>
        {userMgr.state.isError && (
          <h2 className={classes.h2}>{userMgr.state.errorMsg}</h2>
        )}
        {authMgr.isLoggin || (
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            required
            value={authMgr.credentials.email}
            name="email"
            onChange={authMgr.onCredentialsChange}
          />
        )}
        <input
          className={classes.input}
          type="text"
          placeholder="Username"
          required
          value={authMgr.credentials.username}
          name="username"
          onChange={authMgr.onCredentialsChange}
        />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          min={6}
          required
          value={authMgr.credentials.password}
          name="password"
          onChange={authMgr.onCredentialsChange}
        />
        <input
          onClick={authMgr.authHandler}
          className={classes.submit}
          type="submit"
          value={authMgr.isLoggin ? "Login" : "Register"}
        />
        <span
          onClick={() => {
            userMgr.dispatch({ type: "CLEAR_ERROR" });
            authMgr.setIsLoggin((prev) => !prev);
          }}
          className={classes.span}
        >
          {authMgr.isLoggin
            ? "Not registered? Register now"
            : " Already registered? Login now"}
        </span>
      </form>
    </article>
  );
};

export default Auth;
