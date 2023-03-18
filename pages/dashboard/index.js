import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import axios from 'axios'

import "apexcharts/dist/apexcharts.css";

import { Button, Row, Col, notification, Table, Card, Statistic, Divider } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet, requestPost } from "../../utils/baseService";
import { setGrantPermisson } from "../../utils/server/helpers2";
import { BoxPlotOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import CountUp from 'react-countup';

const UserVisitorChart = dynamic(() => import("../../components/Chart/UserVisitorChart"), {
  ssr: false,
});

const GenderPercentage = dynamic(() => import("../../components/Chart/GenderPercentage"), {
  ssr: false,
});

const formatter = (value) => <CountUp end={value} separator="," />;

const DashboardAdmin = ({ session }) => {
    const [state, dispatch] = useAppState();
    const getUser = session?.data?.user?.firstName ?? null

    const [dataVisitorPercentage, setDataVisitorPercentage] = useState([])
    const [dataCategory, setdataCategory] = useState([])
    const [dataLabelGender, setdataLabelGender] = useState([])
    const [dataSeriesGender, setdataSeriesGender] = useState([])
    const [totalArticle, setTotalArticle] = useState()
    const [totalBanner, setTotalBanner] = useState()

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchData({})
      FetchDataVisitor();
      FetchDataGender();
      return () => { };
    }, [])

    const FetchDataVisitor = async () => {
        setLoading(true);
        var params = {};

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/category/list",
          {
            params: params,
          }
        );
        setLoading(false);

        if (datar?.data?.statusCode == 200) {

          let arrVisitor = []
          let arrCategory = []
          datar?.data?.data.map((k,v)=>{
            arrVisitor.push(k?.article?.percentage ?? 0)
            arrCategory.push(k?.name)
          })

          setDataVisitorPercentage(arrVisitor)
          setdataCategory(arrCategory)
        }
    }

    const FetchDataGender = async () => {
      setLoading(true);
      var params = {};

      const datar = await requestGet(
        session,
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/category/list",
        {
          params: params,
        }
      );
      setLoading(false);

      if (datar?.data?.statusCode == 200) {

        let arrGender = [70,30]
        let arrLabelGender = ["Laki-laki", "Perempuan"]
        // datar?.data?.data.map((k,v)=>{
        //   arrGender.push(k?.article?.percentage ?? 0)
        //   arrLabelGender.push(k?.name)
        // })

        setdataSeriesGender(arrGender)
        setdataLabelGender(arrLabelGender)
      }
  }

    const fetchData = async ({}) => {
        setLoading(true);
        var params = {};

        const dataArticle = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/article/list",
          {
            params: params,
          }
        );

        const dataBanner = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/banner/list",
          {
            params: params,
          }
        );
        setLoading(false);

        if (dataArticle?.data?.statusCode == 200) {
          setTotalArticle(dataArticle?.data?.totalData ?? 0);
        }
        if (dataArticle?.data?.statusCode == 200) {
          setTotalBanner(dataBanner?.data?.totalData ?? 0);
        }
    }

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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              title="Persentase Kanal"
              style={{height: "100%"}}
            >
              {dataVisitorPercentage.length >= 1 && dataCategory.length >= 1 && (
                <UserVisitorChart
                  series={dataVisitorPercentage}
                  label={dataCategory}
                />
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              title="Persentase Gender"
              style={{height: "100%"}}
            >
              {dataSeriesGender.length >= 1 && dataLabelGender.length >= 1 && (
                <GenderPercentage
                  series={dataSeriesGender}
                  label={dataLabelGender}
                />
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              title="Persentase Visitor Age"
              style={{height: "100%"}}
            >
              {/* {dataSeriesGender.length >= 1 && dataLabelGender.length >= 1 && (
                <GenderPercentage
                  series={dataSeriesGender}
                  label={dataLabelGender}
                />
              )} */}
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Card>
              <Statistic title="Uniq Visitor" value={1128} prefix={<UserOutlined />} formatter={formatter}/>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Card>
              <Statistic title="Total Article" value={totalArticle} prefix={<FileOutlined />} formatter={formatter}/>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Card>
              <Statistic title="Total Banner" value={totalBanner} prefix={<BoxPlotOutlined />} formatter={formatter}/>
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
