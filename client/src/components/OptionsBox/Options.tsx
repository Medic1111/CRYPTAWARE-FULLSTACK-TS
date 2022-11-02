import classes from "./OptionsBox.module.css";
import Options from "../Options/Options";
import { useContext } from "react";
import { TickerCtx } from "../../features/ticker-ctx";

const OptionsBox: React.FC = () => {
  const tickerMgr = useContext(TickerCtx);

  return (
    <article className={classes.article}>
      {tickerMgr.tickerArr.map((el, index) => {
        return <Options key={`option_${index}`} value={el.toUpperCase()} />;
      })}
    </article>
  );
};

export default OptionsBox;
