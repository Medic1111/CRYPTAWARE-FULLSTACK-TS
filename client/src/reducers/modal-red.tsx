export type ModalActionType =
  | { type: "CLOSE" }
  | { type: "LOADING" }
  | { type: "NOTES" }
  | { type: "SEARCH" };

export type ModalStateType = {
  showModal: boolean;
  loading: boolean;
  notes: boolean;
  search: boolean;
};

export const ModalState = {
  showModal: false,
  loading: false,
  notes: false,
  search: false,
};

const ModalRed = (state: ModalStateType, action: ModalActionType) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...ModalState,
        showModal: true,
        loading: true,
      };
    }
    case "NOTES": {
      return {
        ...ModalState,
        showModal: true,
        notes: true,
      };
    }
    case "SEARCH": {
      return {
        ...ModalState,
        showModal: true,
        search: true,
      };
    }
    case "CLOSE": {
      return { ...ModalState };
    }
    default:
      return { ...ModalState };
  }
};

export default ModalRed;
