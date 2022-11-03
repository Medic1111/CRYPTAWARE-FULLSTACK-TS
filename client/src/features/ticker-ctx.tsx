import axios from "axios";
import { createContext, useState } from "react";

interface ctxValue {
  ticker: string;
  setTicker: React.Dispatch<React.SetStateAction<string>>;
  tickerArr: string[];
  setTickerArr: React.Dispatch<React.SetStateAction<string[] | []>>;
  onBookmark: () => void;
  removeBookmark: () => void;
  bookMarked: boolean;
  setBookMarked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TickerCtx = createContext<ctxValue>({
  ticker: "BTC",
  setTicker: () => {},
  tickerArr: [],
  setTickerArr: () => {},
  onBookmark: () => {},
  removeBookmark: () => {},
  bookMarked: false,
  setBookMarked: () => {},
});

const TickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ticker, setTicker] = useState<string>("BTC");
  const [tickerArr, setTickerArr] = useState<string[] | []>([]);
  const [bookMarked, setBookMarked] = useState<boolean>(false);

  const onBookmark = async () => {
    const storedData = localStorage.getItem("userValidation");
    let username: string = "";
    let token: string = "";

    if (typeof storedData === "string") {
      const parse = await JSON.parse(storedData);
      username = parse.username;
      token = parse.token;
    }

    const cancelToken = axios.CancelToken.source();
    let tickerToUp: string = ticker.toUpperCase();

    await axios
      .post(
        `/api/${username}/bookmark`,
        { ticker: tickerToUp },
        {
          headers: { authorization: token },
          cancelToken: cancelToken.token,
        }
      )
      .then((serverRes) => {
        setTickerArr((prev) => [...prev, ticker.toUpperCase()]);
      })
      .catch((err) => {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err.response);
      });

    return cancelToken.cancel();
  };

  const removeBookmark = async () => {
    const storedData = localStorage.getItem("userValidation");
    let username: string = "";
    let token: string = "";

    if (typeof storedData === "string") {
      const parse = await JSON.parse(storedData);
      username = parse.username;
      token = parse.token;
    }

    const cancelToken = axios.CancelToken.source();
    let tickerToUp: string = ticker.toUpperCase();
    await axios
      .patch(
        `/api/${username}/bookmark`,
        { ticker: tickerToUp },
        {
          headers: { authorization: token },
          cancelToken: cancelToken.token,
        }
      )
      .then((serverRes) => {
        setTickerArr((prev) => {
          return prev.filter((el) => {
            return el.toUpperCase() !== ticker.toUpperCase();
          });
        });
      })
      .catch((err) => {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err.response);
      });

    return cancelToken.cancel();
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
        bookMarked,
        setBookMarked,
      }}
    >
      {children}
    </TickerCtx.Provider>
  );
};

export default TickerProvider;
