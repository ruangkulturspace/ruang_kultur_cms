import { ClockCircleOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import CardClass from "./CardClass";
import { useRouter } from "next/router";

const CardList = ({ title, cta, cta2, cardInfo }) => {
  const router = useRouter();
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
          onClick={() => router.push("/kelas")}
        >
          Lihat Semua <RightOutlined />
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-10">
        {cardInfo?.map((e, index) => {
          return (
            <div
              key={index}
              className="grow cursor-pointer w-full md:w-1/3 lg:w-1/4 hover:drop-shadow-lg"
              onClick={() =>
                router.push(
                  {
                    pathname: `/kelas/${index}`,
                    query: e,
                  },
                  `/kelas/${index}`
                )
              }
            >
              <CardClass
                width="full"
                title={e?.title}
                category={e?.category}
                date={e?.date}
                kuota={e?.kuota}
                imageName={e?.imageName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
