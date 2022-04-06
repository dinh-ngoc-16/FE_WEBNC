import * as actionTypes from "./constants";

let initialState = {
  loading: false,
  data: null,
  err: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHR_REQUEST:
      state.loading = true;
      state.data = null;
      state.err = null;

      return { ...state };

    case actionTypes.AUTHR_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.err = null;
      return { ...state };

    case actionTypes.AUTHR_FAILED:
      state.loading = false;
      state.data = null;
      state.err = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default authReducer;
