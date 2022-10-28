import classes from "./SearchForm.module.css";
import { useState, useContext } from "react";
import { TickerCtx } from "../../features/ticker-ctx";

const SearchForm = () => {
  const [userInput, setUserInput] = useState<string>("");
  const tickerMgr = useContext(TickerCtx);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    tickerMgr.setTicker(userInput);
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
