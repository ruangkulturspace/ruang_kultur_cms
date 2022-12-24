import { setTokenCookie } from "../../utils/cookieHelper";

async function handler(req, res) {
  try {
    console.log("req ==> ", req.body);
    if (req.body.email == "admin@gmail.com" && req.body.password == "admin") {
      const token = "ini_token";

      setTokenCookie(res, token);

      return res.status(200).json({
        success: true,
        message: "Login Succeed",
        data: {
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(401).json({
    success: false,
    message: "Login gagal, email atau password salah",
  });
}

export default handler;
