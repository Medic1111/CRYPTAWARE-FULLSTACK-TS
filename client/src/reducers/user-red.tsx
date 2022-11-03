import { NotesInt } from "../models/NotesInter";

export type UserStateType = {
  username: string;
  token: string;
  bookmarkArr: string[] | [];
  notesArr: NotesInt[] | [];
  loading: boolean;
  isError: boolean;
  errorMsg: string;
};

export type UserActionType =
  | { type: "FETCHING" }
  | { type: "SUCCESS"; payload?: any }
  | { type: "ERROR"; payload?: any }
  | { type: "CLEAR_ERROR" };

export const UserInitState = {
  username: "",
  token: "",
  bookmarkArr: [],
  notesArr: [],
  loading: false,
  isError: false,
  errorMsg: "",
};

const UserRed = (state: UserStateType, action: UserActionType) => {
  switch (action.type) {
    case "FETCHING": {
      return {
        ...UserInitState,
        loading: true,
      };
    }
    case "ERROR": {
      return {
        ...UserInitState,
        isError: true,
        errorMsg: action.payload.errorMsg,
      };
    }
    case "SUCCESS": {
      return {
        ...UserInitState,
        username: action.payload.username,
        token: action.payload.token,
        notesArr: action.payload.notes,
        bookmarkArr: action.payload.bookmarkList,
      };
    }
    case "CLEAR_ERROR": {
      return {
        ...UserInitState,
      };
    }

    default:
      return UserInitState;
  }
};

export default UserRed;
