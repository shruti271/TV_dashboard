export const SHIFT_START = "SHIFT_START";
export const SHIFT_SUCCESS = "SHIFT_SUCCESS";
export const SHIFT_ERROR = "SHIFT_ERROR";

export const loadShiftStart = () => ({
  type: SHIFT_START,
});
export const loadShiftSuccess = (data) => ({
  type: SHIFT_SUCCESS,
  payload: data,
});
export const loadShiftError = (data) => ({
  type: SHIFT_ERROR,
  payload: data,
});

const initialState = {
  data: null,
  loading: false,
  error: "",
};

const shiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIFT_START:
      return {
        ...state,
        loading: true,
      };
    case SHIFT_SUCCESS:
      return {
        ...state,
        loading:false,
        data: action.payload,
      };
    case SHIFT_ERROR:
      return {
        ...state,
        loading:false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default shiftReducer;
