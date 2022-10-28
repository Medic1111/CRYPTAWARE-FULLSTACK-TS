import classes from "./Selection.module.css";
import { useContext } from "react";
import { TickerCtx } from "../../features/ticker-ctx";

import { SelectionAction } from "../../reducers/selection-red";

const Selection: React.FC<{
  invalid: boolean;
  selectionDispatch: React.Dispatch<SelectionAction>;
}> = ({ invalid, selectionDispatch }) => {
  const tickerMgr = useContext(TickerCtx);

  return (
    <section className={classes.section}>
      {invalid ? (
        <h2 className={classes.h2}>INVALID TICKR</h2>
      ) : (
        <h2 className={classes.h2}>
          {tickerMgr.ticker} {new Date().toISOString().slice(5, 10)}
        </h2>
      )}

      <div className={classes.filterBox}>
        <p
          onClick={() => selectionDispatch({ type: "TREND" })}
          className={classes.p}
        >
          TREND
        </p>
        <p
          onClick={() => selectionDispatch({ type: "TREND" })}
          className={classes.mobile}
        >
          T
        </p>
        <p
          onClick={() => selectionDispatch({ type: "DIFF" })}
          className={classes.p}
        >
          DIFF
        </p>
        <p
          onClick={() => selectionDispatch({ type: "DIFF" })}
          className={classes.mobile}
        >
          D
        </p>
        <p
          onClick={() => selectionDispatch({ type: "COMPOUND" })}
          className={classes.p}
        >
          COMPOUND
        </p>
        <p
          onClick={() => selectionDispatch({ type: "COMPOUND" })}
          className={classes.mobile}
        >
          C
        </p>
      </div>
    </section>
  );
};

export default Selection;
