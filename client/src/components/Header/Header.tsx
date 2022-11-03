import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import { AuthCtx } from "../../features/auth-ctx";
import SearchForm from "../SearchForm/SearchForm";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const modalMgr = useContext(ModalCtx);
  const authMgr = useContext(AuthCtx);
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>CRYPTAWARE</h1>
      {authMgr.isAuth && (
        <div className={classes.iconBox}>
          <SearchForm />
          <button
            className={classes.iconBtn}
            onClick={() => {
              modalMgr.dispatch({ type: "SEARCH" });
            }}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          {/* <span
            onClick={() => modalMgr.dispatch({ type: "BOOKMARK" })}
            className="material-symbols-outlined iconBtn"
          >
            bookmark
          </span> */}
          <span
            onClick={() => modalMgr.dispatch({ type: "NOTES" })}
            className="material-symbols-outlined iconBtn"
          >
            sticky_note_2
          </span>
          <span
            onClick={() => authMgr.logout()}
            className="material-symbols-outlined iconBtn"
          >
            logout
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
