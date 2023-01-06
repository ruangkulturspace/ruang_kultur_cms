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
				Authorization: "Bearer " + sessions?.data?.accessToken ?? "",
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

export async function requestGet(
	sessions,
	url,
	{ params, headers, silent = false } = {}
) {
	try {
		console.log("%c FetcherGet: " + url, "background: #222; color: #bada55");
		console.log(
			"%c withParam: " + JSON.stringify(params),
			"background: #222; color: #bada55"
		);

    console.log("asd2", sessions);

		const response = await axios.get(url, {
			params,
			headers: {
				Authorization: "Bearer " + sessions?.data?.accessToken ?? "",
        'x-permission-token': sessions?.data?.accessToken
			}
		});

		return response;
	} catch (error) {
		if (!silent) {
			if (error?.response?.data?.message === "report not found") {
				showErrorCustom(
					"Gagal mengenerate report",
					"Berita Acara penagihan yang anda pilih belum memiliki data pada periode penagihan yang dipilih"
				);
			} else {
				showError(
					error?.response?.data?.message ?? "Terjadi Kesalahan pada server!"
				);
			}
			if (error?.response?.data?.statusCode == "401") {
				doLogout();
			}
		}
		// console.error(error);
		return error;
	}
}
