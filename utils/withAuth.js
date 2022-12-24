import { getTokenCookie } from "./cookieHelper";

const withAuth = (handler, needLogin = true) => async (context) => {
  const { req, res, resolvedUrl } = context;

  let auth = null;

  const token = await getTokenCookie(req);
  if (needLogin && !token) {
    return {
      redirect: {
        destination: `/login?code=2&redirect=${resolvedUrl}`,
        permanent: false,
      },
    }
  }
  if (token) {
    //fetch profile
    auth = {
      token,
      userData: {
        name: "Admin",
        email: "admin@gmail.com",
      },
    };
  }

  return handler({
    ...context,
    auth,
  });
};

export default withAuth;
