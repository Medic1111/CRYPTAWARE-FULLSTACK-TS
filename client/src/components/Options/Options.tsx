import classes from "./Options.module.css";
import { useContext } from "react";
import { TickerCtx } from "../../features/ticker-ctx";

interface Props {
  value: string;
}

const Options: React.FC<Props> = ({ value }) => {
  const tickerMgr = useContext(TickerCtx);
  const resetTicker = () => tickerMgr.setTicker(value);
  return (
    <button onClick={resetTicker} className={classes.btn}>
      <span className={classes.span}> {value}</span>
      <div className={classes.line}></div>
      <div className={classes.line2}></div>
      <div className={classes.speak}></div>
      <div className={classes.speak} id="one"></div>
      <div className={classes.speak} id="two"></div>
      <div className={classes.speak} id="three"></div>
    </button>
  );
};

export default Options;
