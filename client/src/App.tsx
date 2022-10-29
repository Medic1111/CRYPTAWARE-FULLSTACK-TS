import React, { useEffect, useState, useContext } from "react";
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
import { ModalCtx } from "./features/modal-ctx";
import { UserCtx } from "./features/user-ctx";
import Auth from "./components/Auth/Auth";

const App: React.FC = () => {
  const tickerMgr = useContext(TickerCtx);
  const modalMgr = useContext(ModalCtx);
  const userMgr = useContext(UserCtx);

  let [invalid, setInvalid] = useState<boolean>(false);
  let [dataArr, setDataArr] = useState<dataArrInterface[]>([
    { date: "any", value: "any" },
  ]);

  const fetchApi = async () => {
    let cancelToken = axios.CancelToken.source();

    await axios
      .get(`/api/v1/${tickerMgr.ticker}`, { cancelToken: cancelToken.token })
      .then((serverRes) => setDataArr(serverRes.data))
      .catch((err) => {
        axios.isCancel(err)
          ? console.log("Request cancelled")
          : console.log(err);
        setDataArr([]);
        return setInvalid(true);
      });

    return () => cancelToken.cancel();
  };

  useEffect(() => {
    fetchApi();
  }, [tickerMgr.ticker]);

  return (
    <React.Fragment>
      {modalMgr.state.showModal && <Modal />}
      <Header />
      <Wrapper>
        {userMgr.isAuth ? (
          <>
            <OptionsBox />
            <Selection invalid={invalid} />
            <Chart data={dataArr} />
          </>
        ) : (
          <Auth />
        )}
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
};

export default App;
