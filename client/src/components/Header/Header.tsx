import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import { UserCtx } from "../../features/user-ctx";
import SearchForm from "../SearchForm/SearchForm";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const modalMgr = useContext(ModalCtx);
  const userMgr = useContext(UserCtx);
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>CRYPTAWARE</h1>
      {userMgr.isAuth && (
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
          <span
            onClick={() => modalMgr.dispatch({ type: "BOOKMARK" })}
            className="material-symbols-outlined iconBtn"
          >
            bookmark
          </span>
          <span
            onClick={() => modalMgr.dispatch({ type: "NOTES" })}
            className="material-symbols-outlined iconBtn"
          >
            sticky_note_2
          </span>
          <span
            onClick={() => userMgr.logout()}
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
