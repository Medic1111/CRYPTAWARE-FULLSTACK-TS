import classes from "./SearchForm.module.css";
import { useState, useContext } from "react";
import { TickerCtx } from "../../features/ticker-ctx";

const SearchForm: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const tickerMgr = useContext(TickerCtx);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    tickerMgr.setTicker(userInput);

    let itsAlreadyThere = tickerMgr.tickerArr.find(
      (el) => el.toUpperCase() === userInput.toUpperCase()
    );

    if (itsAlreadyThere) {
      return tickerMgr.setBookMarked(true);
    }

    tickerMgr.bookMarked && tickerMgr.setBookMarked(false);
    setUserInput("");
  };

  return (
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
  );
};

export default SearchForm;
