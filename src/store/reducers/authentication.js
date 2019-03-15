import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
    console.log("reducer => SET_CURRENT_USER => action.payload: ", action.payload)
      return {
        ...state,
        user: action.payload
      };

    default:
    console.log("reducer => default=> action.payload: ", action.payload)
      return state;
  }
};

export default reducer;
