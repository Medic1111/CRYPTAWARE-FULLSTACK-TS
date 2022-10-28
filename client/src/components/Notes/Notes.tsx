import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import classes from "./Notes.module.css";

const Notes: React.FC = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <>
      <h1 className={classes.test}>This is the Notes</h1>
      <button onClick={() => modalMgr.dispatch({ type: "CLOSE" })}>
        Close
      </button>
    </>
  );
};

export default Notes;
