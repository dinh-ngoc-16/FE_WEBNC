import * as actionTypes from "./constants";
import axios from "axios";

export const fetchLogin = (user, history) => {
  return (dispatch) => {
    //pending
    dispatch(actAuthRequest());
    axios({
      url: "https://store-backend-dinh.herokuapp.com/api/auth/login",
      method: "POST",
      data: user,
    })
      .then((result) => {
        console.log(result);
        //success
        dispatch(actAuthSuccess(result.data));
        //Lưu trạng thái login xuống localStorage
        localStorage.setItem("UserAdmin", JSON.stringify(result.data));
        //Chuyển hướng qua trang Dashboard
      })
      .catch((err) => {
        //fail
        dispatch(actAuthFailed(err));
      });
  };
};

const actAuthRequest = () => {
  return {
    type: actionTypes.AUTH_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: data,
  };
};

const actAuthFailed = (err) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: err,
  };
};
