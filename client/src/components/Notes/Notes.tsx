import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./Notes.module.css";

const Notes: React.FC = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <>
      <Header />
      <h1 className={classes.test}>This is the Notes</h1>
      <button onClick={() => modalMgr.dispatch({ type: "CLOSE" })}>
        Close
      </button>
      <Footer />
    </>
  );
};

export default Notes;
