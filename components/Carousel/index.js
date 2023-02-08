import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";
import { requestGetWithoutSession } from "../../utils/baseService";
import { useRouter } from "next/router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Index = ({type, arrow, height}) => {
  const router = useRouter();
  const [pageDataJumboTron, setPageDataJumboTron] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataJumboTron = async () => {
      setLoading(true);
      var params = {};

      params.isOnLandingPage = true

      if(type !== undefined){
        params.category = type;
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
      }
  }

  useEffect(() => {
    fetchDataJumboTron();
  }, [type]);

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
            autoplay
            arrows={arrow || false}
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
          >
            {pageDataJumboTron?.map((item, index) => (
              <div
                style={contentStyle}
                key={index}
                onClick={() =>
                  router.push(
                    {
                      pathname: `/kanal-detail?id=${item?._id}`,
                      query: item,
                    },
                    `/kanal-detail?id=${item?._id}`
                  )
                }
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
                <p
                  style={{
                    width: "100%",
                    background: "rgb(190 190 190 / 20%)"
                  }}
                  className="fixed bottom-0 p-10 text-4xl font-bold text-white font__tittle"
                >
                  {item?.title}
                </p>
              </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default Index;
