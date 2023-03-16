import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import axios from 'axios'
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import "apexcharts/dist/apexcharts.css";


import { Button, Row, Col, notification, Table, Card, Statistic } from "antd";
import { getRandomUser } from "../../utils/services/getRandomUser";
import { showError } from "../../utils/helpersBrowser";
import { handleSessions } from "../../utils/helpers";
import { requestPost } from "../../utils/baseService";
import { setGrantPermisson } from "../../utils/server/helpers2";
import { UserOutlined } from "@ant-design/icons";

const DashboardAdmin = ({ session }) => {
    const [state, dispatch] = useAppState();
    const getUser = session?.data?.user?.firstName ?? null

    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [
                  "KULTURATIF",
                  "KULTURAMA",
                  "KULTURNEMA",
                  "KULTURMAIN",
                  "KULTURAGA",
                  "KULTURGAYA",
                  "KULTURBISNIS"
                ]
            }
        },
        series: [
            {
                name: "User",
                data: [30, 40, 35, 50, 49, 60, 70]
            }
        ]
    });

    // console.log("asd", session);

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
        <h3>Helloooooo, {getUser}</h3>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card
              title="Persentase Kanal"
            >
              <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={350} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="Uniq Visitor" value={1128} prefix={<UserOutlined />} />
            </Card>
          </Col>
        </Row>
      </>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default DashboardAdmin;
