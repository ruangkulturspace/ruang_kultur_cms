import { ClockCircleOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import moment from 'moment';
import CardClass from "./CardClass";
import { useRouter } from "next/router";

const CardLates = ({ cardInfo }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col p-10 font-semibold bgW md:p-28">
      <div className="flex flex-col items-start justify-between mb-5 md:flex-row md:items-center">
        <div className="flex flex-col justify-between">
          <p className="my-0 text-3xl font-bold">Lates</p>
        </div>
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
    </div>
  );
};

export default CardLates;
