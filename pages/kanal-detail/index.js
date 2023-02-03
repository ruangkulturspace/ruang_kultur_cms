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

const KanalDetail = ({}) => {
    const router = useRouter()
    const { id } = router.query
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [dataDetail, setDataDetail] = useState({})
    const [dataBanner, setDataBanner] = useState([])
    const [pageData, setPageData] = useState([]);

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
        fetchDataBanner();
    }, []);

    const fetchDataArticle = async (
      isExport = false,
    ) => {
        setLoading(true);
        var params = {};

        if (!isExport) {
          params.page = 1;
          params.perPage = 3;
          params.sort = "date@desc"
          params.isActive = true
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
          setPageData(datar?.data?.data ?? []);
        }
    }

    const fetchDataBanner = async (
      isExport = false,
    ) => {
        setLoading(true);
        var params = {};

        if (!isExport) {
          params.page = 1;
          params.isActive = true;
          params.placement = "ARTIKEL KANAL " + dataDetail?.category?.name
          // params.type = "MEDIUM RECTANGLE 1, MEDIUM RECTANGLE 2"
        }

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

    return (
      <LandingPage title="Kanal-Detail">
        <Row
          gutter={[16, 24]}
          className="px-10 pt-5 font-semibold bgW md:px-28"
        >
          <Col xs={24} sm={24} md={19} lg={19}>
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
          <Col xs={24} sm={24} md={5} lg={5}>
            <Card
              bordered={false}
              // style={{
              //   width: 300,
              // }}
            >
              {/* <Image
                // width={200}
                alt={dataBanner?.image?.pathWithFilename}
                src={dataBanner?.image?.completedUrl}
              /> */}
            </Card>
          </Col>
        </Row>
      </LandingPage>
    );
};

export default KanalDetail;
