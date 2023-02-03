import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";
import { requestGetWithoutSession } from "../../utils/baseService";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [pageDataJumboTron, setPageDataJumboTron] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataJumboTron = async (
    isExport = false,
  ) => {
      setLoading(true);
      var params = {};

      if (!isExport) {
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
      }
  }

  useEffect(() => {
    fetchDataJumboTron();
  }, []);

  const contentStyle = {
    height: "100vh",
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
        <div className="flex items-center justify-center">
          {" "}
          <Spin tip="Loading..." />
        </div>
      ) : (
        <>
          <Carousel autoplay arrows={true}>
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
                    maxHeight: "100vh",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default Index;
