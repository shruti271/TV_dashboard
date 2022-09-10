export const LARGE_LINE_START = "LARGE_LINE_START";
export const LARGE_LINE_SUCCESS = "LARGE_LINE_SUCCESS";
export const LARGE_LINE_ERROR = "LARGE_LINE_ERROR";

export const LARGE_LINE_UPDATE = "LARGE_LINE_UPDATE";

export const loadLargeLineStart = () => ({
  type: LARGE_LINE_START,
});

export const loadLargeLineSuccess = (data) => ({
  type: LARGE_LINE_SUCCESS,
  payload: data,
});

export const loadLargeLineError = (error) => ({
  type: LARGE_LINE_ERROR,
  payload: error,
});
export const updateLargeLine = (data) => ({
  type: LARGE_LINE_UPDATE,
  payload: data,
});
const initialState = {
  shift: "",
  line: "",
  actual: "",
  target: 0,
  varience: 0,
  wipTv: [],
  loading: false,
  error: "",
};

const largeLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case LARGE_LINE_START:
      return {
        loading: true,
      };
    case LARGE_LINE_SUCCESS:
      return {
        ...state,
        actual: action.payload.shifttargets.actual,
        line: action.payload.shifttargets.line.line,
        shift: action.payload.shifttargets.shift.shift,
        target: action.payload.shifttargets.target,
        varience: action.payload.shifttargets.varience,
        wipTv: action.payload.wipTv,
      };
    case LARGE_LINE_ERROR:
      return {
        ...state,
        error: false,
      };
    case LARGE_LINE_UPDATE:
      return {
        ...state,
        actual: action.payload.shifttargets.actual,
        line: action.payload.shifttargets.line.line,
        shift: action.payload.shifttargets.shift.shift,
        target: action.payload.shifttargets.target,
        varience: action.payload.shifttargets.varience,
        wipTv: action.payload.wipTv,
      };
    default:
      return state;
  }
};

export default largeLineReducer;
