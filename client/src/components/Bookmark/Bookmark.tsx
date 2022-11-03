import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./Bookmark.module.css";

const Bookmark: React.FC = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <>
      <Header />
      <h1 className={classes.test}>This is the Bookmark</h1>
      <button onClick={() => modalMgr.dispatch({ type: "CLOSE" })}>
        Close
      </button>
      <Footer />
    </>
  );
};

export default Bookmark;
