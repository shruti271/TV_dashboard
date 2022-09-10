export const FETCH_TYPE = "FETCH_TYPE";

export const fetchTableData = (data) => ({
  type: FETCH_TYPE,
  payload:data
});


const initialState = {
  fetchTable: true,  
  error: "",
};

const fetchTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TYPE:
      return {
        fetchTable: false,
      };
   
    default:
      return state;
  }
};

export default fetchTableReducer;
