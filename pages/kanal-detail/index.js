import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button, Input, Form, Card, Select, DatePicker, Checkbox, Radio, Upload, Spin, Row, Col, Image, Divider, Tag } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGetWithoutSession } from "../../utils/baseService";
import { useRouter } from "next/router";
import LandingPage from "../../components/Layouts/LandingPageLayout";
import CardLates from "../../components/Cards/CardLates";
import CardClass from "../../components/Cards/CardClass";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import BillboardBanner from "../../components/Advertise/BillboardBanner";
import SkinAds from "../../components/Advertise/SkinAds";
import FixHangingBottom from "../../components/Advertise/FixHangingBottom";
import LeaderBoardBanner from "../../components/Advertise/LeaderBoardBanner";
import SuperLeaderBoardBanner from "../../components/Advertise/SuperLeaderBoardBanner";

const KanalDetail = ({}) => {
    const router = useRouter()
    const { id } = router.query
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [dataDetail, setDataDetail] = useState({})
    const [pageData, setPageData] = useState([]);
    const [topArticle, setTopArticle] = useState([]);
    const [dataBanner, setDataBanner] = useState([])

    const fetchDataDetailArticle = async (idArticle) => {
        setLoading(true);

        const datar = await requestGetWithoutSession(
          "",
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/get/${idArticle}`,
        );
        setLoading(false);
        if (datar?.data?.statusCode == 200 ?? false) {
          setDataDetail(datar?.data?.data);
        }
    }

    useEffect(() => {
      if (id) {
        fetchDataDetailArticle(id);
      }
    }, [id]);

    useEffect(() => {
        fetchDataArticle();
        fetchDataTopArticle();
        if(dataDetail?.type?.name === "ADVETORIAL"){
          fetchDataBanner({dataDetail});
        }
    }, [dataDetail]);

    const fetchDataArticle = async () => {
        setLoading(true);
        var params = {};

        params.page = 1;
        params.perPage = 3;
        params.sort = "date@desc"
        params.isActive = true

        const datar = await requestGetWithoutSession(
          "",
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
          {
            params: params,
          }
        );

        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setPageData(datar?.data?.data ?? []);
        }
    }

    const fetchDataTopArticle = async () => {
        setLoading(true);
        var params = {};

        params.page = 1;
        params.perPage = 3;
        params.sort = "count@desc"
        params.isActive = true

        const datar = await requestGetWithoutSession(
          "",
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
          {
            params: params,
          }
        );

        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setTopArticle(datar?.data?.data ?? []);
        }
    }

    const fetchDataBanner = async ({
      placement = dataDetail
    }) => {
        setLoading(true);
        var params = {};

        params.page = 1;
        params.isActive = true;
        params.placement = "ARTIKEL KANAL " + placement?.category?.name

        const datar = await requestGetWithoutSession(
          "",
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/banner/list`,
          {
            params: params,
          }
        );

        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setDataBanner(datar?.data?.data ?? []);
        }
    }

    const retangelBanner1 = dataBanner?.filter(element => element?.type?.name === "MEDIUM RECTANGLE 1");
    const retangelBanner2 = dataBanner?.filter(element => element?.type?.name === "MEDIUM RECTANGLE 2");
    const billboardBanner = dataBanner?.filter(element => element?.type?.name === "BILLBOARD");
    const skinAdsBanner = dataBanner?.filter(element => element?.type?.name === "SKIN AD");
    const fixHangingBottomBanner = dataBanner?.filter(element => element?.type?.name === "FIX HANGING BOTTOM");
    const leaderBoardBanner = dataBanner?.filter(element => element?.type?.name === "LEADERBOARD");
    const superLeaderBoardBanner = dataBanner?.filter(element => element?.type?.name === "SUPER LEADERBOARD");

    return (
      <LandingPage title="Kanal-Detail">
        {billboardBanner?.map((e, index) => {
          return (
            <BillboardBanner
              key={index}
              data={e}
            />
          )
        })}
        {leaderBoardBanner?.map((e, index) => {
          return (
            <LeaderBoardBanner
              key={index}
              data={e}
            />
          )
        })}
        {superLeaderBoardBanner?.map((e, index) => {
          return (
            <SuperLeaderBoardBanner
              key={index}
              data={e}
            />
          )
        })}
        {skinAdsBanner?.map((e, index) => {
          return (
            <SkinAds
              key={index}
              data={e}
            />
          )
        })}
        <Row
          gutter={[16, 24]}
          className="px-10 pt-5 font-semibold bgW md:px-28"
        >
          <Col xs={24} sm={24} md={18} lg={18}>
            <Tag color="#BAFF4A">
              <p style={{color: "black"}} className="p-1.5">{dataDetail?.category?.name}</p>
            </Tag>
            <h3 className="mt-3 font__tittle">
              {dataDetail.title}
            </h3>
            <p
              className="mb-3 text-muted"
              style={{ fontWeight: "100"}}
            >
              {moment(dataDetail?.date).format("DD-MMMM-YYYY HH:mm:ss")} - {dataDetail.editor}
            </p>
            <Image
              preview={false}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "cover",
                objectPosition: "center"
              }}
              className="w-screen h-96"
              alt={dataDetail?.image?.pathWithFilename}
              src={dataDetail?.image?.completedUrl}
            />
            <div className="my-3 text-container" dangerouslySetInnerHTML={{ __html: dataDetail?.content }} />
            <p
              className="my-3 text-lg"
              style={{
                textDecoration: "none",
                borderBottom:"5px solid #BAFF4A",
                width: "150px"
              }}
            >
              Rekomendasi
            </p>
            <div className="grid gap-10 grid-rows md:grid-cols-2 lg:grid-cols-3">
              {pageData?.map((e, index) => {
                return (
                  <div
                    key={index}
                    className="w-full cursor-pointer hovered-card hover:drop-shadow-lg"
                    onClick={() =>
                      router.push(
                        {
                          pathname: `/kanal-detail?id=${e?._id}`,
                          query: e,
                        },
                        `/kanal-detail?id=${e?._id}`
                      )
                    }
                  >
                    <CardClass
                      width="full"
                      title={e?.title}
                      category={e?.category?.name}
                      date={moment(e?.date).format("DD-MMMM-YYYY")}
                      imageName={e?.image?.completedUrl}
                    />
                  </div>
                );
              })}
            </div>
            <br />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            {retangelBanner1?.map((e, index) => {
              return (
                <Card
                  bordered={false}
                  key={index}
                >
                  <a href={e?.url}>
                    <Image
                      preview={false}
                      width={300}
                      height={250}
                      alt={e?.image?.pathWithFilename}
                      src={e?.image?.completedUrl}
                    />
                  </a>
                </Card>
              )
            })}
            {retangelBanner2?.map((e, index) => {
              return (
                <Card
                  bordered={false}
                  key={index}
                >
                  <a href={e?.url}>
                    <Image
                      preview={false}
                      width={300}
                      height={250}
                      alt={e?.image?.pathWithFilename}
                      src={e?.image?.completedUrl}
                    />
                  </a>
                </Card>
              )
            })}
            <p
              className="my-3 text-lg"
              style={{
                textDecoration: "none",
                borderBottom:"5px solid #BAFF4A",
                width: "150px"
              }}
            >
              Berita Populer
            </p>
            <ol className="list-decimal list-inside">
              {topArticle?.map((e, index) => {
                return (
                  <li key={index}>
                    <Link href={`/kanal-detail?id=${e?._id}`}>
                      {e?.title}
                    </Link>
                  </li>
                )
              })}
            </ol>
            <button
              className="flex items-center gap-1 px-4 py-1 mt-3 mb-4 ml-20 font-semibold btnLightCnBlue md:my-0"
              onClick={() => router.push("/")}
            >
              Lihat Semua <RightOutlined />
            </button>
          </Col>
        </Row>
        {fixHangingBottomBanner?.map((e, index) => {
          return (
            <FixHangingBottom
              key={index}
              data={e}
            />
          )
        })}
      </LandingPage>
    );
};

export default KanalDetail;
