export const INDUSTRY_LINE_START = "INDUSTRY_LINE_START";
export const INDUSTRY_LINE_SUCCESS = "INDUSTRY_LINE_SUCCESS";
export const INDUSTRY_LINE_ERROR = "INDUSTRY_LINE_ERROR";

export const INDUSTRY_LINE_UPDATE = "INDUSTRY_LINE_UPDATE";

export const loadIndustryLineStart = () => ({
  type: INDUSTRY_LINE_START,
});

export const loadIndustryLineSuccess = (data) => ({
  type: INDUSTRY_LINE_SUCCESS,
  payload: data,
});

export const loadIndustryLineError = (error) => ({
  type: INDUSTRY_LINE_ERROR,
  payload: error,
});
export const updateIndustryLine = (data) => ({
  type: INDUSTRY_LINE_UPDATE,
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

const industryLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case INDUSTRY_LINE_START:
      return {
        loading: true,
      };
    case INDUSTRY_LINE_SUCCESS:
      return {
        ...state,
        actual: action.payload.shifttargets.actual,
        line: action.payload.shifttargets.line.line,
        shift: action.payload.shifttargets.shift.shift,
        target: action.payload.shifttargets.target,
        varience: action.payload.shifttargets.varience,
        wipTv: action.payload.wipTv,
      };
    case INDUSTRY_LINE_ERROR:
      return {
        ...state,
        error: false,
      };
    case INDUSTRY_LINE_UPDATE:
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

export default industryLineReducer;
