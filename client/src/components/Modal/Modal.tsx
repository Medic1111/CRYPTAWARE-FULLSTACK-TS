import Portal from "../Portal/Portal";
import Notes from "../Notes/Notes";
import SearchModalForm from "../SearchModalForm/SearchModalForm";
import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import Loading from "../Loading/Loading";

const Modal: React.FC = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <Portal>
      {modalMgr.state.search && <SearchModalForm />}
      {modalMgr.state.notes && <Notes />}
      {modalMgr.state.loading && <Loading />}
    </Portal>
  );
};
export default Modal;
