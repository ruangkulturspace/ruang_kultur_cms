import { requestPost } from "../baseService";

export const doLogin = async (email, password) =>
  requestPost("/api/loginDummy", { data: { email, password } });
