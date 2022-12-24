import axios from "axios";
import { ReplaceNavigateTo } from "./helpersBrowser";

export const requestPost = async (
  url,
  { data: requestBody, token, needLogin = true, getErrorMessage }
) => {
  try {
    const { data } = await axios.post(url, requestBody, {
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });
    return data;
  } catch (e) {
    return errorHandler(
      e?.response?.status,
      getErrorMessage
        ? getErrorMessage(e)
        : e?.response?.data?.message ?? e?.message,
      needLogin
    );
  }
};

export const requestPut = async (
  url,
  { data: requestBody, token, needLogin = true, getErrorMessage }
) => {
  try {
    const { data } = await axios.put(url, requestBody, {
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });
    return data;
  } catch (e) {
    return errorHandler(
      e?.response?.status,
      getErrorMessage
        ? getErrorMessage(e)
        : e?.response?.data?.message ?? e?.message,
      needLogin
    );
  }
};

const errorHandler = async (status, message, needLogin = true) => {
  if (status === 401 && needLogin) {
    ReplaceNavigateTo("/api/logout");
  }
  return Promise.reject({
    message: message ?? "Something went wrong",
    status,
  });
};

export const requestGet = async (
  url,
  { params, token, needLogin = true, getErrorMessage }
) => {
  try {
    const { data } = await axios.get(url, {
      params,
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });
    return data;
  } catch (e) {
    return errorHandler(
      e?.response?.status,
      getErrorMessage
        ? getErrorMessage(e)
        : e?.response?.data?.message ?? e?.message,
      needLogin
    );
  }
};
