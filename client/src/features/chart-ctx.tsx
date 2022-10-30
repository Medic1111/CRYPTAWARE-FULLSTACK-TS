import React, { createContext, useContext, useState } from "react";
import { dataArrInterface } from "../models/AppInterface";
import axios from "axios";
import { TickerCtx } from "./ticker-ctx";
import { UserCtx } from "./user-ctx";

interface Value {
  invalid: boolean;
  setInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  dataArr: dataArrInterface[];
  setDataArr: React.Dispatch<React.SetStateAction<dataArrInterface[]>>;
  fetchApi: () => void;
}

export const ChartCtx = createContext<Value>({
  invalid: false,
  setInvalid: () => {},
  dataArr: [{ date: "any", value: "any" }],
  setDataArr: () => {},
  fetchApi: () => {},
});

const ChartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(UserCtx);
  const tickerMgr = useContext(TickerCtx);

  const [invalid, setInvalid] = useState<boolean>(false);
  const [dataArr, setDataArr] = useState<dataArrInterface[]>([
    { date: "any", value: "any" },
  ]);

  const fetchApi = async () => {
    let cancelToken = axios.CancelToken.source();
    await axios
      .get(`/api/v1/${tickerMgr.ticker}`, { cancelToken: cancelToken.token })
      .then((serverRes) => {
        setDataArr(serverRes.data);
      })
      .catch((err) => {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
        setDataArr([]);
        return setInvalid(true);
      });

    return () => cancelToken.cancel();
  };

  return (
    <ChartCtx.Provider
      value={{
        invalid,
        setInvalid: setInvalid,
        dataArr,
        setDataArr: setDataArr,
        fetchApi,
      }}
    >
      {children}
    </ChartCtx.Provider>
  );
};

export default ChartProvider;
