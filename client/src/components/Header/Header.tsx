import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import { AuthCtx } from "../../features/auth-ctx";
import SearchForm from "../SearchForm/SearchForm";
import classes from "./Header.module.css";
import axios from "axios";

const Header: React.FC = () => {
  const modalMgr = useContext(ModalCtx);
  const authMgr = useContext(AuthCtx);

  const fetchNews = async () => {
    if (modalMgr.news.length >= 1) {
      return;
    }

    modalMgr.dispatch({ type: "LOADING" });

    const cancelToken = axios.CancelToken.source();

    await axios
      .get("/api/v1/news/crypto", { cancelToken: cancelToken.token })
      .then((serverRes) => {
        modalMgr.dispatch({ type: "NOTES" });

        return modalMgr.setNews(serverRes.data);
      })
      .catch((err) => {
        modalMgr.dispatch({ type: "NOTES" });

        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
      });

    return cancelToken.cancel();
  };
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

          <span
            onClick={() => {
              modalMgr.state.notes
                ? modalMgr.dispatch({ type: "CLOSE" })
                : modalMgr.dispatch({ type: "NOTES" });
              return fetchNews();
            }}
            className="material-symbols-outlined iconBtn"
          >
            sticky_note_2
          </span>
          <span
            onClick={() => {
              authMgr.logout();
              modalMgr.dispatch({ type: "CLOSE" });
            }}
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
