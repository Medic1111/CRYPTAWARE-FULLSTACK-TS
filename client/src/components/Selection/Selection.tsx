import classes from "./Selection.module.css";
import { useContext } from "react";
import { TickerCtx } from "../../features/ticker-ctx";
import { SelectionCtx } from "../../features/selection-ctx";
import { ChartCtx } from "../../features/chart-ctx";

const Selection: React.FC = () => {
  const tickerMgr = useContext(TickerCtx);
  const selMgr = useContext(SelectionCtx);
  const chartMgr = useContext(ChartCtx);
  const mapThis = ["TREND", "DIFF", "COMPOUND"];

  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>
        {chartMgr.invalid
          ? "INVALID TICKR"
          : tickerMgr.ticker + " " + new Date().toISOString().slice(5, 10)}
      </h2>

      <div className={classes.filterBox}>
        {mapThis.map((el, index) => {
          let execute = () => {
            switch (index) {
              case 0:
                return selMgr.SelDispatch({ type: "TREND" });
              case 1:
                return selMgr.SelDispatch({ type: "DIFF" });
              case 2:
                return selMgr.SelDispatch({ type: "COMPOUND" });
              default:
                return selMgr.SelDispatch({ type: "COMPOUND" });
            }
          };
          return (
            <>
              <p onClick={() => execute()} className={classes.p}>
                {el}
              </p>
              <p onClick={() => execute()} className={classes.mobile}>
                {el.slice(0, 1)}
              </p>
            </>
          );
        })}
        <span
          onClick={() => {
            tickerMgr.setBookMarked((prev) => !prev);
            tickerMgr.bookMarked
              ? tickerMgr.removeBookmark()
              : tickerMgr.onBookmark();
          }}
          className="material-symbols-outlined iconSelection"
        >
          {tickerMgr.bookMarked ? "bookmark_added" : "bookmark_add"}
        </span>
      </div>
    </section>
  );
};

export default Selection;
