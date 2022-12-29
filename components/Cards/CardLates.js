import { ClockCircleOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import CardClass from "./CardClass";
import { useRouter } from "next/router";

const CardLates = ({ title, cta, cta2, cardInfo }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col p-10 font-semibold bgW md:p-20">
      {/* <p className="cCnBlue">{title}</p> */}
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="flex flex-col justify-between">
          <p className="my-0 text-3xl font-bold">{cta}</p>
          <p className="my-0 text-2xl font-bold">{cta2}</p>
        </div>
        {/* <button
          className="flex items-center gap-1 my-5 font-semibold btnLightCnBlue md:my-0"
          onClick={() => router.push("/kelas")}
        >
          Lihat Semua <RightOutlined />
        </button> */}
      </div>
      <div className="grid gap-10 mb-11 grid-rows md:grid-cols-2 lg:grid-cols-3">
        {cardInfo?.map((e, index) => {
          return (
            <div
              key={index}
              className="w-full cursor-pointer hovered-card hover:drop-shadow-lg"
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

export default CardLates;
