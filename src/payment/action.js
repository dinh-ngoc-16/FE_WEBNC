import * as actionTypes from "./constants";
import axios from "axios";

export const fetchReg = (user) => {
  return (dispatch) => {
    //pending
    dispatch(actAuthRequest());
    axios({
      url: "https://store-backend-dinh.herokuapp.com/api/auth/register",
      method: "POST",
      data: user,
    })
      .then((result) => {
        console.log(result);
        //success
        dispatch(actAuthSuccess(result.data));
        //Lưu trạng thái login xuống localStorage
        // localStorage.setItem("UserAdmin", JSON.stringify(result.data));
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
    type: actionTypes.AUTHR_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: actionTypes.AUTHR_SUCCESS,
    payload: data,
  };
};

const actAuthFailed = (err) => {
  return {
    type: actionTypes.AUTHR_FAILED,
    payload: err,
  };
};
