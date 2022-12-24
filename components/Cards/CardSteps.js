import React from "react";

const CardSteps = ({ title, cta, cta2, cardInfo }) => {
  const Card = ({ title, desc, imageName }) => {
    return (
      <div
        className="mt-1 md:mt-5 flex flex-col items-center justify-start w-full md:w-1/3 lg:w-1/4"
        style={{
          height: "100%",
        }}
      >
        <div
          className="flex justify-center items-center"
          style={{
            // height: "100px",
            aspectRatio: "2",
            width: "100%",
          }}
        >
          <img src={`/assets/icons/${imageName}.png`} alt={`${imageName}`} style={{width: "80%", height: "80%", objectFit: "contain"}} />
        </div>
        <p className="mb-1 mt-3 uppercase text-base cCnBlue font-semibold">
          {title}
        </p>
        <p className="text-left text-sm w-2/3 break-normal">{desc}</p>
      </div>
    );
  };
  return (
    <div className="flex flex-col px-10 md:px-20 py-12 items-start md:items-center">
      {/* <p className="cCnBlue text-xs font-semibold">{title}</p> */}
      <p className="text-2xl font-semibold mb-0">{cta}</p>
      <p className="text-2xl font-semibold mb-0">{cta2}</p>
      <div className="flex flex-wrap justify-center flex-row mb-5 md:mb-0">
        {cardInfo?.map((e, index) => {
          return (
            <Card key={index} title={e?.title} desc={e?.desc} imageName={e?.imageName} />
          );
        })}
      </div>
    </div>
  );
};

export default CardSteps;
