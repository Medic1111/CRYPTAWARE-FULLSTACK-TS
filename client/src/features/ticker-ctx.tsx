import { createContext, useState } from "react";

interface ctxValue {
  ticker: string;
  setTicker: React.Dispatch<React.SetStateAction<string>>;
  tickerArr: string[];
  setTickerArr: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TickerCtx = createContext<ctxValue>({
  ticker: "BTC",
  setTicker: () => {},
  tickerArr: [],
  setTickerArr: () => {},
});

const TickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ticker, setTicker] = useState<string>("BTC");
  const [tickerArr, setTickerArr] = useState<string[]>([
    "BTC",
    "ETH",
    "BNB",
    "SOL",
    "ADA",
    "DOGE",
  ]);

  return (
    <TickerCtx.Provider
      value={{
        ticker,
        setTicker: setTicker,
        tickerArr,
        setTickerArr,
      }}
    >
      {children}
    </TickerCtx.Provider>
  );
};

export default TickerProvider;
