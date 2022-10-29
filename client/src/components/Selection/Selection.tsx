import classes from "./Selection.module.css";
import { useContext, useState } from "react";
import { TickerCtx } from "../../features/ticker-ctx";
import { SelectionCtx } from "../../features/selection-ctx";

interface Props {
  invalid: boolean;
}

const Selection: React.FC<Props> = ({ invalid }) => {
  const tickerMgr = useContext(TickerCtx);
  const selMgr = useContext(SelectionCtx);
  // TEST
  const [bookmarked, setBookMarked] = useState<boolean>(false);
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
          onClick={() => selMgr.SelDispatch({ type: "TREND" })}
          className={classes.p}
        >
          TREND
        </p>
        <p
          onClick={() => selMgr.SelDispatch({ type: "TREND" })}
          className={classes.mobile}
        >
          T
        </p>
        <p
          onClick={() => selMgr.SelDispatch({ type: "DIFF" })}
          className={classes.p}
        >
          DIFF
        </p>
        <p
          onClick={() => selMgr.SelDispatch({ type: "DIFF" })}
          className={classes.mobile}
        >
          D
        </p>
        <p
          onClick={() => selMgr.SelDispatch({ type: "COMPOUND" })}
          className={classes.p}
        >
          COMPOUND
        </p>
        <p
          onClick={() => selMgr.SelDispatch({ type: "COMPOUND" })}
          className={classes.mobile}
        >
          C
        </p>
        <span
          onClick={() => setBookMarked((prev) => !prev)}
          className="material-symbols-outlined iconSelection"
        >
          {bookmarked ? "bookmark_added" : "bookmark_add"}
        </span>
      </div>
    </section>
  );
};

export default Selection;
