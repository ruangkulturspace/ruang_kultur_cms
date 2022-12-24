import { removeTokenCookie } from "../../utils/cookieHelper";

const handler = async (req, res) => {
    removeTokenCookie(res)
    res.writeHead(302, { Location: '/login?code=1' })
    res.end()
}

export default handler;
