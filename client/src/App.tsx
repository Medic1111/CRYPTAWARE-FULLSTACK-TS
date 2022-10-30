import React, { useEffect, useContext } from "react";
import { TickerCtx } from "./features/ticker-ctx";
import Selection from "./components/Selection/Selection";
import Modal from "./components/Modal/Modal";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Wrapper from "./components/Wrapper/Wrapper";
import OptionsBox from "./components/OptionsBox/Options";
import Chart from "./components/Chart/Chart";
import { ModalCtx } from "./features/modal-ctx";
import { AuthCtx } from "./features/auth-ctx";
import Auth from "./components/Auth/Auth";
import { ChartCtx } from "./features/chart-ctx";
import { UserCtx } from "./features/user-ctx";

const App: React.FC = () => {
  const tickerMgr = useContext(TickerCtx);
  const modalMgr = useContext(ModalCtx);
  const authMgr = useContext(AuthCtx);
  const chartMgr = useContext(ChartCtx);
  const userMgr = useContext(UserCtx);

  useEffect(() => {
    authMgr.isTokenExp();
  }, [tickerMgr.ticker, tickerMgr.tickerArr]);

  useEffect(() => {
    chartMgr.fetchApi();
  }, [tickerMgr.ticker]);

  return (
    <React.Fragment>
      {modalMgr.state.showModal && <Modal />}
      {userMgr.state.loading ? (
        <h1>LOADING</h1>
      ) : (
        <>
          <Header />
          <Wrapper>
            {authMgr.isAuth ? (
              <>
                <OptionsBox />
                <Selection />
                <Chart />
              </>
            ) : (
              <Auth />
            )}
          </Wrapper>
          <Footer />
        </>
      )}
    </React.Fragment>
  );
};

export default App;
