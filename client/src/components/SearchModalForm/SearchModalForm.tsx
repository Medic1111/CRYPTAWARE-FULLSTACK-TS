import classes from "./SearchModalForm.module.css";
import { useContext, useState } from "react";
import { TickerCtx } from "../../features/ticker-ctx";
import { ModalCtx } from "../../features/modal-ctx";

const SearchModalForm: React.FC = () => {
  const tickerMgr = useContext(TickerCtx);
  const modalMgr = useContext(ModalCtx);
  const [userInput, setUserInput] = useState("");

  const submitHandler = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    let itsAlreadyThere = tickerMgr.tickerArr.find(
      (el) => el.toUpperCase() === userInput.toUpperCase()
    );

    if (itsAlreadyThere) {
      tickerMgr.setBookMarked(true);
      modalMgr.dispatch({ type: "CLOSE" });
      tickerMgr.setTicker(userInput);
      return;
    }

    tickerMgr.setTicker(userInput);
    tickerMgr.bookMarked && tickerMgr.setBookMarked(false);
    modalMgr.dispatch({ type: "CLOSE" });
  };

  return (
    <section className={classes.section}>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          className={classes.input}
          placeholder="Tickr"
          required
          type="text"
        />
        <span className={classes.inputBorder}></span>
      </form>
      <div className={classes.btnBox}>
        <button
          className={classes.btn}
          onClick={() => modalMgr.dispatch({ type: "CLOSE" })}
        >
          Cancel
        </button>
        <button onClick={submitHandler} className={classes.btn}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchModalForm;
