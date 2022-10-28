import Portal from "../Portal/Portal";
import Notes from "../Notes/Notes";
import Bookmark from "../Bookmark/Bookmark";
import SearchModalForm from "../SearchModalForm/SearchModalForm";
import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";

const Modal: React.FC = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <Portal>
      {modalMgr.state.search && <SearchModalForm />}
      {modalMgr.state.notes && <Notes />}
      {modalMgr.state.bookmark && <Bookmark />}
    </Portal>
  );
};
export default Modal;
