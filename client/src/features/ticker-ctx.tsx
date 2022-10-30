import { createContext, useState } from "react";

interface ctxValue {
  ticker: string;
  setTicker: React.Dispatch<React.SetStateAction<string>>;
  tickerArr: string[];
  setTickerArr: React.Dispatch<React.SetStateAction<string[] | []>>;
  onBookmark: () => void;
  removeBookmark: () => void;
}

export const TickerCtx = createContext<ctxValue>({
  ticker: "BTC",
  setTicker: () => {},
  tickerArr: [],
  setTickerArr: () => {},
  onBookmark: () => {},
  removeBookmark: () => {},
});

const TickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ticker, setTicker] = useState<string>("BTC");
  const [tickerArr, setTickerArr] = useState<string[] | []>([]);

  const onBookmark = () => {
    setTickerArr((prev) => [...prev, ticker]);
  };

  const removeBookmark = () => {
    setTickerArr((prev) => {
      return prev.filter((el) => {
        return el !== ticker;
      });
    });
  };

  return (
    <TickerCtx.Provider
      value={{
        ticker,
        setTicker: setTicker,
        tickerArr,
        setTickerArr,
        onBookmark,
        removeBookmark,
      }}
    >
      {children}
    </TickerCtx.Provider>
  );
};

export default TickerProvider;
