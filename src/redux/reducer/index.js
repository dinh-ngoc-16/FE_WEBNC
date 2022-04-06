import handleCart from "./handlerCart";
import authReducer from "../../login/reducer";
import fetchReg from "../../register/reducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  handleCart,
  authReducer,
  fetchReg,
});

export default rootReducers;
