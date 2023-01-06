import axios from 'axios'
// import { setSession } from '../../utils/server/helpers2';
// import { withSentry } from '@sentry/nextjs';
import { rejectNull, setSession } from '../../utils/server/helpers2'

async function handler(req, res) {
    try {
        rejectNull(req.body.username);
        rejectNull(req.body.password);
        // fetch klo api sudah ready disini...
        var datar = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/v1/user/login', {
            username: req.body.username,
            password: req.body.password
        })
        if (datar?.data?.statusCode === 200) {
            // set session :
            let session_result = await setSession(req, res, JSON.stringify(datar?.data?.data), process.env.APPNAME)
            if (session_result?.code == 0) {
                return res.status(200).json({
                    code: 0,
                    info: 'Login Succeed',
                    data: datar?.data?.data,
                    token: session_result
                })
            } else {
                return res.status(400).json(session_result)
            }
        } else {
            return res.status(400).json({
                code: 2,
                info: 'Login gagal, email atau password salah',
            })
        }
    } catch (error) {
        return res.status(400).json(
            error?.response?.data ? error?.response?.data : error
        )
    }
}

export default handler;
