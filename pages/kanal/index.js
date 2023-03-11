import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import moment from 'moment';
import CardClass from "../../components/Cards/CardClass";
import LandingPage from "../../components/Layouts/LandingPageLayout";
import Carousel from "../../components/Carousel"

import { useAppState } from "../../components/shared/AppProvider";
import { requestGetWithoutSession, requestPostWithoutSession } from "../../utils/baseService";
import { Button, Card, Col, Image, Pagination, Row, Spin } from "antd";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import BillboardBanner from "../../components/Advertise/BillboardBanner";
import LeaderBoardBanner from "../../components/Advertise/LeaderBoardBanner";
import SuperLeaderBoardBanner from "../../components/Advertise/SuperLeaderBoardBanner";
import SkinAds from "../../components/Advertise/SkinAds";
import FixHangingBottom from "../../components/Advertise/FixHangingBottom";
import ExpandAble from "../../components/Advertise/ExpandAble";
import HalfPage from "../../components/Advertise/HalfPage";
import MedRetangle1 from "../../components/Advertise/MedRetangle1";
import MedRetangle2 from "../../components/Advertise/MedRetangle2";

const Kanal = ({}) => {
  const router = useRouter()
  const { type } = router.query
  const [state, dispatch] = useAppState();

  const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 3,
      total: 0,
      position: ["none", "bottomCenter"],
      totalPage: 0
  });

  const [pageData, setPageData] = useState([]);
  const [topArticle, setTopArticle] = useState([]);
  const [dataBanner, setDataBanner] = useState([])
  const [idData, setIdData] = useState([])

  const [loading, setLoading] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingTopArticle, setLoadingTopArticle] = useState()
  const [loadingCount, setLoadingCount] = useState(false);

  const fetchData = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    isExport = false,
    category = type
  }) => {
      setLoading(true);
      var params = {};

      if (!isExport) {
        params.page = page;
        params.perPage = limit;
        params.category = category;
      }

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
        {
          params: params,
        }
      );

      setLoading(false);

      if (datar?.data?.statusCode == 200) {
        if(datar?.data?.totalData >= 1){
          const listCard = []
          datar?.data?.data.forEach(element => {
            listCard.push(element);
          });
          setPageData((pageData) => [...pageData, ...listCard]);
        }else{
          setPageData([])
        }

        setPagination({
          current: datar?.data?.currentPage ?? 1,
          pageSize: datar?.data?.perPage,
          total: datar?.data?.totalData ?? 0,
          position: ["none", "bottomCenter"],
          totalPage: datar?.data?.totalPage ?? 0
        });
      }
  }

  const fetchDataTopArticle = async () => {
      setLoadingTopArticle(true);
      var params = {};

      params.page = 1;
      params.perPage = 3;
      params.sort = "totalCounter@desc"
      params.isActive = true

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
        {
          params: params,
        }
      );

      setLoadingTopArticle(false);

      if (datar?.data?.statusCode == 200) {
        setTopArticle(datar?.data?.data ?? []);
      }
  }

  useEffect(() => {
    fetchData({ page: pagination.current, limit: pagination.pageSize, category: type });
    fetchDataTopArticle();
    fetchDataBanner({type})
  }, [type]);

  const handleChangeTable1 = () => {
    const pager = { ...pagination };
    pager.current = pagination.current + 1;
    setPagination(pager);
    fetchData({ page: pagination.current + 1, limit: pagination.pageSize, category: type});
  };

  const handleClickCount = async (id) => {
    setLoadingCount(true);
    const param = {
      "article": id,
      "tag": "click",
    };

    var counter = await requestPostWithoutSession(
      "",
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/article-counter/create',
      param
    )
    setLoadingCount(false);
    if (counter?.data?.statusCode < 400) {
      console.log("berhasil count");
    }
  }

  const fetchDataBanner = async ({
    placement = type
  }) => {
      setLoadingBanner(true);
      var params = {};

      params.page = 1;
      params.isActive = true;
      params.placement = "HOMEPAGE " + placement

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/banner/list`,
        {
          params: params,
        }
      );

      setLoadingBanner(false);

      if (datar?.data?.statusCode == 200) {
        setDataBanner(datar?.data?.data ?? []);
        setIdData(datar?.data?.data?.map((k)=> k._id))
      }
  }

  const fetchCounterBanner = async (ids) => {
      setLoadingCount(true);
      const param = {
        "bannerIds": ids,
        "tag": "view",
      };

      var counter = await requestPostWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + '/api/v1/banner-counter/bulk-create',
        param
      )
      setLoadingCount(false);
      if (counter?.data?.statusCode < 400) {
        console.log("berhasil count");
      }
  }

  useEffect(() => {
    fetchCounterBanner(idData)
  }, [idData])

  const retangelBanner1 = dataBanner?.filter(element => element.type?.name === "MEDIUM RECTANGLE 1");
  const retangelBanner2 = dataBanner?.filter(element => element.type?.name === "MEDIUM RECTANGLE 2");
  const billboardBanner = dataBanner?.filter(element => element.type?.name === "BILLBOARD");
  const skinAdsBanner = dataBanner?.filter(element => element.type?.name === "SKIN AD");
  const fixHangingBottomBanner = dataBanner?.filter(element => element.type?.name === "FIX HANGING BOTTOM");
  const leaderBoardBanner = dataBanner?.filter(element => element.type?.name === "LEADERBOARD");
  const superLeaderBoardBanner = dataBanner?.filter(element => element.type?.name === "SUPER LEADERBOARD");
  const expandAble = dataBanner?.filter(element => element?.type?.name === "EXPANDABLE");
  const halfPage = dataBanner?.filter(element => element?.type?.name === "HALF PAGE");

  return (
    <>
      <LandingPage title="Kanal">
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
        {state.mobile === false ? (
          <>
            {skinAdsBanner?.map((e, index) => {
              return (
                <SkinAds
                  key={index}
                  data={e}
                />
              )
            })}
            {billboardBanner?.map((e, index) => {
              return (
                <BillboardBanner
                  key={index}
                  data={e}
                />
              )
            })}
          </>
        ) : null}
        {retangelBanner1?.map((e, index) => {
          return (
            <MedRetangle1
              key={index}
              data={e}
            />
          )
        })}
        {retangelBanner2?.map((e, index) => {
          return (
            <MedRetangle2
              key={index}
              data={e}
            />
          )
        })}
        <div className="flex flex-col px-10 py-5 font-semibold bgW md:px-28">
          <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
            <div className="flex flex-col justify-between">
              <p className="my-0 text-3xl font-bold">{type}</p>
            </div>
          </div>
          <Row
            gutter={[16, 24]}
            className="py-5"
          >
            <Col xs={24} sm={24} md={18} lg={18}>
              <Carousel
                type={type}
                arrow={true}
                height={"66vh"}
                width={"119vh"}
              />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <p
                className="mb-3 text-lg"
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
                    <Row
                      key={index}
                      gutter={[16, 24]}
                      className="py-2"
                      onClick={()=>{handleClickCount(e?._id)}}
                    >
                      <Col xs={10} sm={10} md={10} lg={10}>
                        <Image
                          preview={false}
                          style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "10vh",
                            objectFit: "cover",
                            objectPosition: "center"
                          }}
                          alt={e?.image?.pathWithFilename}
                          src={e?.image?.completedUrl}
                        />
                      </Col>
                      <Col xs={14} sm={14} md={14} lg={14}>
                        <Link
                          href={`/kanal-detail?id=${e?._id}`}
                          className="text-lg underline font__tittle"
                        >
                          {e?.title}
                        </Link>
                        <p className="text-xs font-light text-muted">
                          {e?.category?.name}
                        </p>
                      </Col>
                    </Row>
                  )
                })}
              </ol>
              <button
                className="flex items-center gap-1 px-4 py-1 mt-3 mb-4 ml-3 font-semibold md:ml-20 btnLightCnBlue md:my-0"
                onClick={() => router.push("/")}
              >
                Lihat Semua <RightOutlined />
              </button>
            </Col>
          </Row>
          <p
            className="my-3 text-lg"
            style={{
              textDecoration: "none",
              borderBottom:"5px solid #BAFF4A",
              width: "150px"
            }}
          >
            Article
          </p>

          {(pageData.length >= 1) ? (
            <>
              <div className="grid gap-10 mb-11 grid-rows md:grid-cols-2 lg:grid-cols-3">
                {pageData?.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full cursor-pointer hovered-card hover:drop-shadow-lg"
                      onClick={() =>{
                        router.push(
                          {
                            pathname: `/kanal-detail?id=${e._id}`,
                            query: e,
                          },
                          `/kanal-detail?id=${e._id}`
                        )
                        handleClickCount(e?._id)
                      }}
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
              <center>
                {pagination?.current === pagination?.totalPage ? (
                  <></>
                ):(
                  <>
                    {loading && (
                      <div className="flex flex-col items-center justify-center mb-3">
                        <Spin size="large" />
                      </div>
                    )}
                    <Button
                        disabled={false}
                        style={{
                            borderRadius: '4px',
                            boxShadow: '0px 2px 5px rgba(51, 83, 158, 0.2)',
                        }}
                        onClick={handleChangeTable1}
                        className="btn btnLightCnBlue"
                    >
                        Load more data
                    </Button>
                  </>
                )}
              </center>
            </>
          ):(
            <Row gutter={[10, 10]} align="middle" justify="center">
              <span
                style={{
                    color: '#FA4547',
                    background: 'rgba(250, 69, 71, 0.2)',
                    padding: '3px 10px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold'
                }}
              >
                No Data
              </span>
            </Row>
          )}
        </div>
        {fixHangingBottomBanner?.map((e, index) => {
          return (
            <FixHangingBottom
              key={index}
              data={e}
            />
          )
        })}
        {state.mobile === false ? (
          <>
            {expandAble?.map((e, index) => {
              return (
                <ExpandAble
                  key={index}
                  data={e}
                />
              )
            })}
            {halfPage?.map((e, index) => {
              return (
                <HalfPage
                  key={index}
                  data={e}
                />
              )
            })}
          </>
        ): null }
      </LandingPage>
    </>
  );
};

export default Kanal;
