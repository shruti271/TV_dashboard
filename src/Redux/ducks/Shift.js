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
      const a = action.payload.map((d) => {        
        if (d.end === "00:00:00") {
          d.end = "23:59:59";
        }
      //   if(d.start=== "00:00:00")   d.start = "23:59:59";
        return d;
      });
      console.log("||||||||||||||||||||", a);
      return {
        ...state,
        loading: false,
        data: a,
      };
    case SHIFT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default shiftReducer;
