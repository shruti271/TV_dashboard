export const SINGLE_PHRASE_START = "SINGLE_PHRASE_START";
export const SINGLE_PHRASE_SUCCESS = "SINGLE_PHRASE_SUCCESS";
export const SINGLE_PHRASE_ERROR = "SINGLE_PHRASE_ERROR";

export const SINGLE_PHRASE_UPDATE = "SINGLE_PHRASE_UPDATE";

export const loadSinglePhraseStart = () => ({
  type: SINGLE_PHRASE_START,
});

export const loadSinglePhraseSuccess = (data) => ({
  type: SINGLE_PHRASE_SUCCESS,
  payload: data,
});

export const loadSinglePhraseError = (error) => ({
  type: SINGLE_PHRASE_ERROR,
  payload: error,
});
export const updateSinglePhrase = (data) => ({
  type: SINGLE_PHRASE_UPDATE,
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

const singlePhraseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_PHRASE_START:
      return {
        loading: true,
      };
    case SINGLE_PHRASE_SUCCESS:
      return {
        ...state,
        actual: action.payload.shifttargets.actual,
        line: action.payload.shifttargets.line.line,
        shift: action.payload.shifttargets.shift.shift,
        target: action.payload.shifttargets.target,
        varience: action.payload.shifttargets.varience,
        wipTv: action.payload.wipTv,
      };
    case SINGLE_PHRASE_ERROR:
      return {
        ...state,
        error: false,
      };
    case SINGLE_PHRASE_UPDATE:
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

export default singlePhraseReducer;
