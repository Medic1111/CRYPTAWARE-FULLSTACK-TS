import * as R from "recharts";
import classes from "./Chart.module.css";
import { useContext } from "react";
import { SelectionCtx } from "../../features/selection-ctx";
import { ChartCtx } from "../../features/chart-ctx";

const Chart: React.FC = () => {
  const selMgr = useContext(SelectionCtx);
  const chartMgr = useContext(ChartCtx);

  return (
    <div className={classes.chart}>
      <R.ResponsiveContainer width="100%" height="100%">
        <R.ComposedChart
          margin={{ top: 25, right: 20, bottom: 5, left: 20 }}
          data={chartMgr.dataArr}
        >
          {selMgr.SelState.trend && (
            <>
              <R.Line type="monotone" dataKey="1. open" stroke="#0dd936" />
              <R.Line type="monotone" dataKey="4. close" stroke="#d9650d" />
            </>
          )}
          <R.CartesianGrid strokeDasharray="10 5" stroke="#999999" />
          <R.XAxis
            tick={{ fill: "#2abfbf", fontSize: 13 }}
            dataKey="5. volume"
          />
          <R.YAxis
            tick={{ fill: "#2abfbf", fontSize: 16 }}
            type="number"
            domain={[19000, "dataMax"]}
          />
          <R.Tooltip />
          <R.Legend />
          {selMgr.SelState.diff && (
            <>
              <R.Bar dataKey="3. low" barSize={10} fill="#d90dbe" />
              <R.Bar dataKey="2. high" barSize={10} fill="#0dd9d2" />
            </>
          )}
        </R.ComposedChart>
      </R.ResponsiveContainer>
    </div>
  );
};

export default Chart;
