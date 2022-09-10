export const SMALL_MEDUIM_START = "SMALL_MEDUIM_START";
export const SMALL_MEDUIM_SUCCESS = "SMALL_MEDUIM_SUCCESS";
export const SMALL_MEDUIM_ERROR = "SMALL_MEDUIM_ERROR";

export const SMALL_MEDUIM_UPDATE = "SMALL_MEDUIM_UPDATE";

export const loadSmallMeduimStart = () => ({
  type: SMALL_MEDUIM_START,
});

export const loadSmallMeduimSuccess = (data) => ({
  type: SMALL_MEDUIM_SUCCESS,
  payload: data,
});

export const loadSmallMeduimError = (error) => ({
  type: SMALL_MEDUIM_ERROR,
  payload: error,
});

export const updateSmallMeduim = (data) => ({
  type: SMALL_MEDUIM_UPDATE,
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

const smallMeduimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SMALL_MEDUIM_START:
      return {
        loading: true,
      };
    case SMALL_MEDUIM_SUCCESS:
      return {
        ...state,
        actual: action.payload.shifttargets.actual,
        line: action.payload.shifttargets.line.line,
        shift: action.payload.shifttargets.shift.shift,
        target: action.payload.shifttargets.target,
        varience: action.payload.shifttargets.varience,
        wipTv: action.payload.wipTv,
      };
    case SMALL_MEDUIM_ERROR:
      return {
        ...state,
        error: false,
      };
    case SMALL_MEDUIM_UPDATE:
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

export default smallMeduimReducer;
