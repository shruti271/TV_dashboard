// export const LARGE_LINE_START = "LARGE_LINE_START";
// export const LARGE_LINE_ERROR = "LARGE_LINE_ERROR";

export const GET_SHIFT = "GET_SHIFT";

export const loadShift = (data) => ({
  type: GET_SHIFT,
  payload:data
});

// export const loadLargeLineSuccess = (data) => ({
//   type: LARGE_LINE_SUCCESS,
//   payload: data,
// });

// export const loadLargeLineError = (error) => ({
//   type: LARGE_LINE_ERROR,
//   payload: error,
// });
// export const updateLargeLine = (data) => ({
//   type: LARGE_LINE_UPDATE,
//   payload: data,
// });
const initialState = {
    data:null,
//   shift: "",
//   line: "",
//   actual: "",
//   target: 0,
//   varience: 0,
//   wipTv: [],
  loading: false,
  error: "",
};

const shiftReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIFT:
      return {
        data: action.payload,
      };
    
    default:
      return state;
  }
};

export default shiftReducer;
