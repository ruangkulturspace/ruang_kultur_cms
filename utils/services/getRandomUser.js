import { requestGet } from "../baseService";

export const getRandomUser = async ({ current: page = 1, pageSize: results = 10 }) =>
  requestGet("https://randomuser.me/api/", {
    params: {
      page,
      results,
    },
  });
