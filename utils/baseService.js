import axios from "axios";
import { notification } from "antd";
import { ReplaceNavigateTo } from "./helpersBrowser";


export function showError(msg) {
	notification["error"]({
		message: "Error!",
		description: msg,
	});
}

export async function requestPost(sessions, url, data, settings = {}) {
	try {
		console.log("%c FetcherPost: " + url, "background: #222; color: #bada55");
		console.log(
			"%c withParam: " + JSON.stringify(data),
			"background: #222; color: #bada55"
		);
		console.log(
			"%c withSettings: " + JSON.stringify(settings),
			"background: #222; color: #bada55"
		);

		const response = await axios.post(url, data, {
			headers: {
				Authorization: "Bearer " + sessions?.data?.access_token ?? "",
			},
		});

		return response;
	} catch (error) {
		showError(
			error?.response?.data?.message ??
			error?.response?.data?.info ??
			"Terjadi Kesalahan pada server!"
		);
		if (error?.response?.data?.statusCode == "401") {
			doLogout();
		}
		console.error(error);
		return {
			code: -1,
			info:
				error?.response?.data?.message ??
				error?.response?.data?.info ??
				"Terjadi Kesalahan pada server!",
		};
	}
}

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
