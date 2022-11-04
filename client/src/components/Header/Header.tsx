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

    await axios
      .get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=COIN,CRYPTO:BTC,FOREX:USD&limit=50&apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((serverRes) => {
        return modalMgr.setNews(serverRes.data.feed);
      })
      .catch((err) => {
        console.log(err);
      });
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
          {/* <span
            onClick={() => modalMgr.dispatch({ type: "BOOKMARK" })}
            className="material-symbols-outlined iconBtn"
          >
            bookmark
          </span> */}
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
