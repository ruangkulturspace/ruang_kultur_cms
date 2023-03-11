import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";
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
        // params.isOnLandingPage = false
      }else{
        params.isOnLandingPage = true
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

  // useEffect(() => {
  //   fetchCounterArticle(idData)
  // }, [idData])

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
          <Carousel
            // autoplay
            arrows={arrow || false}
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
          >
            {pageDataJumboTron?.map((item, index) => (
              <div
                style={contentStyle}
                key={index}
                className="cursor-pointer"
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
              >
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
                    background: "rgb(190 190 190 / 20%)",
                    // width: width || "188vh",
                    width: state.mobile === true ? "42vh" : width
                  }}
                  className="p-10 text-4xl font-bold text-white font__tittle fixed-wrap"
                >
                  {item?.title}
                </div>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default Index;
