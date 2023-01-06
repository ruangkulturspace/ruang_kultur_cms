import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import axios from 'axios'

import { Button, Row, Col, notification, Table } from "antd";
import { getRandomUser } from "../../utils/services/getRandomUser";
import { showError } from "../../utils/helpersBrowser";
import { handleSessions } from "../../utils/helpers";
import { requestPost } from "../../utils/baseService";
import { setGrantPermisson } from "../../utils/server/helpers2";

const DashboardAdmin = ({ session }) => {
    const [state, dispatch] = useAppState();
    const getUser = session?.data?.user?.firstName ?? null

    const FetchGrantPermisson = async ({req, res}) => {
        var params = {}

        params.scope = [
          "USER",
          "ROLE",
          "PERMISSION",
          "API_KEY",
          "SETTING"
        ]

        const datar = await requestPost(
            session,
            process.env.NEXT_PUBLIC_API_URL + '/api/v1/user/grant-permission',
            params
        );

        if (datar?.data?.statusCode === 200) {
          let grant_permission_result = await setGrantPermisson(req, res, datar?.data?.data, process.env.APPNAME)
          // console.log("asd", grant_permission_result);
          if (grant_permission_result?.code == 0) {
              return res?.status(200).json({
                  code: 0,
                  info: 'Grant Permission Succeed',
                  data: datar?.data?.data,
                  grantPermission: grant_permission_result
              })
          } else {
              return res.status(400).json(grant_permission_result)
          }
        }
    }

    useEffect(() => {
      FetchGrantPermisson({});
      return () => { };
    }, []);

    return (
        <>
            <h3>Hello {getUser}</h3>
        </>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default DashboardAdmin;
