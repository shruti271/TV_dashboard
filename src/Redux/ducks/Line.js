export const LINE_START = "LINE_START";
export const LINE_SUCCESS = "LINE_SUCCESS";
export const LINE_ERROR = "LINE_ERROR";

export const loadLineStart = () => ({
  type: LINE_START,
});
export const loadLineSuccess = (data) => ({
  type: LINE_SUCCESS,
  payload: data,
});
export const loadLineError = (data) => ({
  type: LINE_ERROR,
  payload: data,
});

const initialState = {
  data: { Wip: [], Traget: [] },
  loading: false,
  error: "",
};

const lineReducer = (state = initialState, action) => {
  switch (action.type) {
    case LINE_START:
      return {
        ...state,
        loading: true,
      };
    case LINE_SUCCESS:
     
      console.log("0000000000000000000000 ||||||||||||||||||||", action.payload);
      return {
        ...state,
        loading: false,
        data: {
          Wip:action.payload?.wipTv,
          Traget:action.payload?.shift_targets,
        },
      };
    case LINE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default lineReducer;
