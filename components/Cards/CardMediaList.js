import { RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import CardMedia from "./CardMedia";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { requestGet } from "../../utils/baseService";

const CardMediaList = ({ title, cta, cta2 }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    let res = await requestGet(`v1/news?per_page=3`, { needLogin: false });
    if (res?.meta?.code === 200) {
      setData(res?.data?.data);
      setLoading(false);
    }else{
      showAlert(
        "Error!",
        `Gagal mendapatkan data file. ${res?.meta?.message}`,
        "error"
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, [])

  return (
    <div className="bgW flex flex-col p-10 md:p-20 font-semibold">
      <p className="cCnBlue">{title}</p>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col justify-between">
          <p className="font-bold text-2xl my-0">{cta}</p>
          <p className="font-bold text-2xl my-0">{cta2}</p>
        </div>
        <button
          className="btnLightCnBlue flex items-center gap-1 font-semibold my-5 md:my-0"
          onClick={() => router.push("/rilis-media")}
        >
          Lihat Semua <RightOutlined />
        </button>
      </div>
      <div className="flex flex-row justify-center flex-wrap gap-10">
      {loading ? (
        <div className="flex justify-center items-center">
          {" "}
          <Spin tip="Loading..." />
        </div>
        ) : (
          <>
          {data?.map((e) => {
            return (
              <div
                key={e?.id}
                className="grow cursor-pointer w-full md:w-1/3 lg:w-1/4 hover:drop-shadow-lg"
                onClick={() =>
                  router.push(
                    {
                      pathname: `/rilis-media/${e.id}`,
                      query: e,
                    },
                    `/rilis-media/${e.id}`
                  )
                }
              >
                <CardMedia
                  width="full"
                  title={e?.title}
                  category={e?.category}
                  date={e?.date}
                  imageName={e?.img}
                />
              </div>
            );
          })}
          </>
        )}
      </div>
    </div>
  );
};

export default CardMediaList;
