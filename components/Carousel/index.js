import React, { useState, useEffect } from "react";
import { Carousel, Row, Spin } from "antd";
import { requestGetWithoutSession, requestPostWithoutSession } from "../../utils/baseService";
import { useRouter } from "next/router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useAppState } from "../shared/AppProvider";

const Index = ({type, arrow, height, width}) => {
  const router = useRouter();
  const [state, dispatch] = useAppState();
  const [pageDataJumboTron, setPageDataJumboTron] = useState([]);
  const [idData, setIdData] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);

  const fetchDataJumboTron = async () => {
      setLoading(true);
      var params = {};

      if(type !== undefined){
        params.category = type;
        params.perPage = 10
        params.isActive = "true";
        params.sort = "date@desc"
        // params.isOnLandingPage = false
      }else{
        params.isOnLandingPage = true
        params.isActive = "true";
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
          setPageDataJumboTron(datar?.data?.data ?? []);
          setIdData(datar?.data?.data?.map((k)=> k._id))
      }
  }

  // const fetchCounterArticle = async (ids) => {
  //     setLoadingCount(true);
  //     const param = {
  //       "articleIds": ids,
  //       "tag": "view",
  //     };

  //     var counter = await requestPostWithoutSession(
  //       "",
  //       process.env.NEXT_PUBLIC_API_URL + '/api/v1/article-counter/bulk-create',
  //       param
  //     )
  //     setLoadingCount(false);
  //     if (counter?.data?.statusCode < 400) {
  //       console.log("berhasil count");
  //     }
  // }

  useEffect(() => {
    fetchDataJumboTron();
  }, [type]);

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


  const contentStyle = {
    height: height || "80vh",
    color: "#fff",
    lineHeight: "160px",
    background: "linear-gradient(180deg, #BAFF4A 0%, rgba(64, 87, 28, 0.742708) 67.71%, rgba(6, 6, 6, 0.62) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center" style={{height: "100vh"}}>
          {" "}
          <Spin tip="Loading..." />
        </div>
      ) : (
        <>
          {pageDataJumboTron.length > 0 ? (
            <Carousel
              autoplay
              arrows={true}
              prevArrow={<LeftOutlined />}
              nextArrow={<RightOutlined />}
            >
              {pageDataJumboTron?.map((item, index) => (
                <div
                  style={contentStyle}
                  key={index}
                  className="cursor-pointer"
                >
                  <div
                    style={{
                      position: "absolute",
                      // background: "red",
                      width: "55vw",
                      height: "55vh",
                      margin: "1% 4%"
                    }}
                    onClick={() => {
                      router.push(
                        {
                          pathname: `/kanal-detail?id=${item?._id}`,
                          query: item,
                        },
                        `/kanal-detail?id=${item?._id}`
                      )
                      handleClickCount(item?._id)
                    }}
                  ></div>
                  <img
                    src={item?.image?.completedUrl}
                    alt={item.title}
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: height || "80vh",
                      maxHeight: "100vh",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <div
                    style={{
                      // background: "rgb(190 190 190 / 20%)",
                      width: state.mobile === true ? "81vw" : width
                    }}
                    className="p-10 text-4xl font-bold text-white font__tittle fixed-wrap"
                  >
                    {item?.title}
                  </div>
                </div>
              ))}
            </Carousel>
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
                    fontWeight: 'bold',
                }}
              >
                No Data
              </span>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default Index;
