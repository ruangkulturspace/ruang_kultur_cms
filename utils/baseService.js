import axios from "axios";
import jwt from 'jsonwebtoken';
import { notification } from "antd";
import { ReplaceNavigateTo } from "./helpersBrowser";
import { decryptBro, setRefreshSession } from "./server/helpers2";


export function showError(msg) {
	notification["error"]({
		message: "Error!",
		description: msg,
	});
}

export function showSuksesCustom(msg, desc) {
	notification["success"]({
		message: msg,
		description: desc,
	});
}

async function doRefreshToken(req, res) {
  try {
    var params = {}

    const datar = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/user/refresh',
      params,
      {
        headers: {
          Authorization: "Bearer " + req?.data?.refreshToken ?? "",
        }
      }
    )
    if (datar?.data?.statusCode === 200) {
      let session_refresh = await setRefreshSession(req, res, JSON.stringify(datar?.data?.data), process.env.APPNAME)

      if (session_refresh.code == 0) {
          return res.status(200).json({
            code: 0,
            info: 'Refresh Succeed',
            data: datar?.data?.data,
            token: session_refresh
          })
        } else {
          return res.status(400).json(session_refresh)
        }
      } else {
        return res.status(400).json({
          code: 2,
          info: 'Refresh token gagal',
        }
      )
    }
  } catch (error) {
    return res?.status(400).json(
      error?.response?.data ? error?.response?.data : error
    )
  }
}

async function doRefreshPermission(req, res) {
  try {
    var params = {}

    params.scope = [
      "USER",
      "ROLE",
      "PERMISSION",
      "API_KEY",
      "SETTING"
    ]

    let updateCookie = document?.cookie?.split("; ")[1]?.split("=")[1]

    let bearer = updateCookie;

    let decrypted = decryptBro(process.env.APPKEY, bearer);
    let verifiedjwt = await jwt.verify(decrypted, process.env.APPKEY);
    let newCookie = JSON.parse(verifiedjwt.sess)

    const header = {
      Authorization: "Bearer " + newCookie.accessToken,
    }

    const datar = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/user/grant-permission',
      params,
      {
        headers: header
      }
    )
    if (datar?.data?.statusCode === 200) {
      let session_refresh = await setGrantPermisson(req, res, datar?.data?.data, process.env.APPNAME)

      if (session_refresh.code == 0) {
          console.log("asd0", session_refresh);
          return res.status(200).json({
            code: 0,
            info: 'Refresh Succeed',
            data: datar?.data?.data,
            token: session_refresh
          })
        } else {
          return res.status(400).json(session_refresh)
        }
      } else {
        return res.status(400).json({
          code: 2,
          info: 'Refresh token gagal',
        }
      )
    }
  } catch (error) {
    return res?.status(400).json(
      error?.response?.data ? error?.response?.data : error
    )
  }
}

const errorHandler = async (status, message, needLogin = true) => {
  if (status === 401 && needLogin) {
    ReplaceNavigateTo("/api/logout");
  }
  return Promise.reject({
    message: message ?? "Something went wrong",
    status,
  });
};

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
		if (error?.response?.status == "401") {
			await doRefreshToken(sessions);
      await doRefreshPermission(sessions);

      let updateCookie = document?.cookie?.split("; ")[1]?.split("=")[1]

      let bearer = updateCookie;

      let decrypted = decryptBro(process.env.APPKEY, bearer);
      let verifiedjwt = await jwt.verify(decrypted, process.env.APPKEY);
      let newCookie = JSON.parse(verifiedjwt.sess)

      const header = {
        Authorization: "Bearer " + newCookie.accessToken,
        'x-permission-token': newCookie.accessToken
      }

      const retryResponse = axios.post(url, data, {
        headers: header
      });

      return retryResponse;
		}else{
      showError(
        error?.response?.data?.message ??
        error?.response?.data?.info ??
        "Terjadi Kesalahan pada server!"
      );
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

export async function requestPut(sessions, url, data) {
	try {
		console.log("%c FetcherPut: " + url, "background: #222; color: #bada55");
		console.log(
			"%c withParam: " + JSON.stringify(data),
			"background: #222; color: #bada55"
		);

		const response = await axios.put(url, data, {
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
		if (error?.response?.status == "401") {
      await doRefreshToken(sessions);
      await doRefreshPermission(sessions);

      let updateCookie = document?.cookie?.split("; ")[1]?.split("=")[1]

      let bearer = updateCookie;

      let decrypted = decryptBro(process.env.APPKEY, bearer);
      let verifiedjwt = await jwt.verify(decrypted, process.env.APPKEY);
      let newCookie = JSON.parse(verifiedjwt.sess)

      const header = {
        Authorization: "Bearer " + newCookie.accessToken,
        'x-permission-token': newCookie.accessToken
      }

      const retryResponse = axios.get(url, {
        headers: header
      });
      return retryResponse;
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

export async function requestGet(
	sessions,
	url,
	{ params, headers } = {},
) {
	try {
		console.log("%c FetcherGet: " + url, "background: #222; color: #bada55");
		console.log(
			"%c withParam: " + JSON.stringify(params),
			"background: #222; color: #bada55"
		);

		const response = await axios.get(url, {
			params,
			headers: {
				Authorization: "Bearer " + sessions?.data?.accessToken ?? "",
        'x-permission-token': sessions?.data?.grantAccess?.data ?? ""
			}
		});

		return response;
	} catch (error) {
    if (error?.response?.status == "401") {
      await doRefreshToken(sessions);
      await doRefreshPermission(sessions);

      let updateCookie = document?.cookie?.split("; ")[1]?.split("=")[1]

      let bearer = updateCookie;

      let decrypted = decryptBro(process.env.APPKEY, bearer);
      let verifiedjwt = await jwt.verify(decrypted, process.env.APPKEY);
      let newCookie = JSON.parse(verifiedjwt.sess)

      const header = {
        Authorization: "Bearer " + newCookie.accessToken,
        'x-permission-token': newCookie.accessToken
      }

      const retryResponse = axios.get(url, {
        params,
        headers: header
      });
      return retryResponse;
    }
    else{
      showError(
        error?.response?.data?.message ??
        error?.response?.data?.info ??
        "Terjadi Kesalahan pada server!"
      );
    }
		// console.error(error);
		// return error;
	}
}


export async function requestDelete(
	sessions,
	url,
	{ params, headers, silent = false } = {}
) {
	try {
		console.log("%c FetcherDelete: " + url, "background: #222; color: #bada55");
		console.log(
			"%c withParam: " + JSON.stringify(params),
			"background: #222; color: #bada55"
		);

		const response = await axios.delete(url, {
			params,
			headers: {
				...headers,
				Authorization: "Bearer " + sessions?.data?.accessToken ?? "",
			},
		});

		return response;
	} catch (error) {
		// showError(
		// 	error?.response?.data?.message ??
		// 	error?.response?.data?.info ??
		// 	"Terjadi Kesalahan pada server!"
		// );
		if (error?.response?.status == "401") {
      await doRefreshToken(sessions);
      await doRefreshPermission(sessions);

      let updateCookie = document?.cookie?.split("; ")[1]?.split("=")[1]

      let bearer = updateCookie;

      let decrypted = decryptBro(process.env.APPKEY, bearer);
      let verifiedjwt = await jwt.verify(decrypted, process.env.APPKEY);
      let newCookie = JSON.parse(verifiedjwt.sess)

      const header = {
        Authorization: "Bearer " + newCookie.accessToken,
        'x-permission-token': newCookie.accessToken
      }

      const retryResponse = axios.delete(url, {
        params,
        headers: header
      });
      return retryResponse;
    }else{
      showError(
        error?.response?.data?.message ??
        error?.response?.data?.info ??
        "Terjadi Kesalahan pada server!"
      );
    }
		// console.error(error);
		return {
			code: -1,
			info:
				error?.response?.data?.message ??
				error?.response?.data?.info ??
				"Terjadi Kesalahan pada server!",
		};
	}
}
