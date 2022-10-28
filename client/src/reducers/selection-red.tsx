export type SelectionAction =
  | { type: "TREND" }
  | { type: "DIFF" }
  | { type: "COMPOUND" };

export type SelectionState = {
  trend: boolean;
  diff: boolean;
  compound: boolean;
};

export const SelectionInitialState = {
  trend: true,
  diff: true,
  compound: false,
};

const SelectionReducer = (state: SelectionState, action: SelectionAction) => {
  switch (action.type) {
    case "COMPOUND": {
      return {
        ...SelectionInitialState,
      };
    }
    case "TREND": {
      return {
        ...SelectionInitialState,
        diff: false,
      };
    }
    case "DIFF": {
      return {
        ...SelectionInitialState,
        trend: false,
      };
    }
    default:
      return SelectionInitialState;
  }
};

export default SelectionReducer;
