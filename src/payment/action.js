import * as actionTypes from "./constants";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const fetchReg = (user, history) => {
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
