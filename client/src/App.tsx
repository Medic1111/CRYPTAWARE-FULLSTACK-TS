import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import { dataArrInterface } from "./models/AppInterface";
import { TickerCtx } from "./features/ticker-ctx";
import Selection from "./components/Selection/Selection";
import Modal from "./components/Modal/Modal";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper/Wrapper";
import OptionsBox from "./components/OptionsBox/Options";
import Chart from "./components/Chart/Chart";
import SelectionReducer from "./reducers/selection-red";
import { SelectionInitialState } from "./reducers/selection-red";

const App: React.FC = () => {
  const [selectionState, selectionDispatch] = useReducer(
    SelectionReducer,
    SelectionInitialState
  );

  const tickerMgr = useContext(TickerCtx);

  let [showModal, setShowModal] = useState<boolean>(false);
  let [invalid, setInvalid] = useState<boolean>(false);
  let [dataArr, setDataArr] = useState<dataArrInterface[]>([
    { date: "any", value: "any" },
  ]);

  const fetchApi = async () => {
    let cancelToken = axios.CancelToken.source();

    await axios
      .get(
        `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${tickerMgr.ticker}&market=USD&interval=15min&apikey=${process.env.REACT_APP_API_KEY}`,
        { cancelToken: cancelToken.token }
      )
      .then((serverRes) => {
        if (serverRes.data["Error Message"]) {
          setDataArr([]);
          return setInvalid(true);
        } else {
          setInvalid(false);
          let data = serverRes.data["Time Series Crypto (15min)"];
          let structured: dataArrInterface[] = [];
          Object.keys(data).forEach((key) => {
            structured.push(data[key]);
          });
          setDataArr(structured);
        }
      })
      .catch((err) =>
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err)
      );

    return () => cancelToken.cancel();
  };

  useEffect(() => {
    fetchApi();
  }, [tickerMgr.ticker]);

  return (
    <React.Fragment>
      {showModal && <Modal setShowModal={setShowModal} />}
      <Header setShowModal={setShowModal} />
      <Wrapper>
        <OptionsBox />
        <Selection invalid={invalid} selectionDispatch={selectionDispatch} />
        <Chart data={dataArr} selectionState={selectionState} />
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
};

export default App;
