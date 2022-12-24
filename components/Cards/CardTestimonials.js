import React, { useState, useEffect } from "react";
import { requestGet } from "../../utils/baseService";

const CardTestimonials = ({ title, cta, cta2, cardInfo }) => {
  const [data, setData] = useState([]);

  const getTestimonials = async () => {
    try {
      let res = await requestGet(`v1/testimony`, {});
      console.log("console log nya res", res);
      setData(res?.data?.data);
    } catch (err) {
      console.log("console log nya err", err);
    }
  };

  useEffect(() => {
    getTestimonials();

    return () => {};
  }, []);

  const Card = ({ name, occupation, comment, imageName }) => {
    return (
      <div
        className="mt-1 md:mt-5 flex flex-col items-center md:items-start justify-start w-full md:w-1/3 lg:w-1/4 rounded-2xl bgW drop-shadow px-8 py-8"
        style={{
          height: "100%",
          width: "calc(100% / 4)",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}v1/view/${imageName}`}
          alt="profile"
        />
        <p className="mb-0 mt-4 uppercase text-base font-semibold">{name}</p>
        <p className="text-sm cMedgrey">{occupation}</p>
        <p className="text-sm mt-2 cMedgrey">{comment}</p>
      </div>
    );
  };
  return (
    <div className="flex flex-col p-10 md:p-20 items-center">
      <p className="cCnBlue text-xs font-semibold">{title}</p>
      <p className="text-2xl font-semibold mb-0">{cta}</p>
      <p className="text-2xl font-semibold mb-0">{cta2}</p>
      <div className="flex flex-row flex-wrap gap-1 justify-around w-full">
        {data?.map((e, index) => {
          return (
            <Card
              key={e?.id}
              name={e?.name}
              occupation={e?.occupation}
              comment={e?.content}
              imageName={e?.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardTestimonials;
