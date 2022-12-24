import React, { useState, useEffect } from "react";
import { Carousel, Spin } from "antd";
import { requestGet } from "../../utils/baseService";

const Index = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("console log nya carouselData", carouselData);

  const fetchCarouselData = async () => {
    setLoading(true);
    let res = await requestGet(`v1/slider`, {});
    if (res?.meta?.code === 200) {
      setLoading(false);
      setCarouselData(res?.data);
    } else {
      setLoading(false);
      setCarouselData([]);
    }
  };
  // console.log("console log nya data", carouselData);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  const contentStyle = {
    height: "536px",
    color: "#fff",
    lineHeight: "160px",
    background: "#364d79",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          {" "}
          <Spin tip="Loading..." />
        </div>
      ) : (
        <>
          <Carousel afterChange={onChange} autoplay arrows={true}>
            {carouselData?.map((item, index) => (
              <div style={contentStyle} key={index}>
                <img
                  src={item.image?.replace("public/upload/media", "v1/view")}
                  alt={item.title}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
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
