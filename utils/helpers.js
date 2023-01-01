import axios from "axios";
import { getSessionFromHeader } from "./server/helpers2";

export const handleSessions = async (ctx, needLogin = true, dontRedirect = false) => {
    let sessionUser = await getSessionFromHeader(ctx.req);
    if (sessionUser.code === 0) {
        try {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/user/profile', {
                headers: {
                    Authorization: "Bearer " + sessionUser?.data?.accessToken,
                }
            })
            return {
                props: {
                    session: {
                        code: 0,
                        data: {
                            user: data.data,
                            accessToken: sessionUser?.data?.accessToken,
                        }
                    }
                }
            }
        } catch (e) { }
        return { props: { session: sessionUser } }
    } else {
        if (needLogin) {
            let from = '';
            if (ctx.req.url != "/login" && !ctx.req.url.includes("/_next") && ctx.req.url != "/") {
                console.log('redirected to login from : ', ctx.req.url)
                from = ctx.req.url;
            }
            if (from) {
                return {
                    redirect: {
                        destination: '/login?code=2&from=' + from,
                        permanent: false,
                    },
                }
            } else {
                return {
                    redirect: {
                        destination: '/login?code=2',
                        permanent: false,
                    },
                }
            }
        } else {
            return { props: { session: { code: '-1' } } }
        }
    }
}
