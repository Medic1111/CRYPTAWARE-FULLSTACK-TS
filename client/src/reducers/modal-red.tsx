export type ModalActionType =
  | { type: "CLOSE" }
  | { type: "BOOKMARK" }
  | { type: "NOTES" }
  | { type: "SEARCH" };

export type ModalStateType = {
  showModal: boolean;
  bookmark: boolean;
  notes: boolean;
  search: boolean;
};

export const ModalState = {
  showModal: false,
  bookmark: false,
  notes: false,
  search: false,
};

const ModalRed = (state: ModalStateType, action: ModalActionType) => {
  switch (action.type) {
    case "BOOKMARK": {
      console.log("book");

      return {
        ...ModalState,
        showModal: true,
        bookmark: true,
      };
    }
    case "NOTES": {
      console.log("notes");

      return {
        ...ModalState,
        showModal: true,
        notes: true,
      };
    }
    case "SEARCH": {
      console.log("search");
      return {
        ...ModalState,
        showModal: true,
        search: true,
      };
    }
    case "CLOSE": {
      console.log("close");

      return { ...ModalState };
    }
    default:
      return { ...ModalState };
  }
};

export default ModalRed;
