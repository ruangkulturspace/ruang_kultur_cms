import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Index = ({ titles, currentCard, setCurrentCard }) => {
  const Card = ({ title, index }) => {
    if (currentCard === index) {
      return (
        <div
          className="flex items-center justify-center border-solid border-white rounded bgRkGreen px-5 py-2 relative"
          style={{ width: "280px", height: "68px" }}
          onClick={() => setCurrentCard(index)}
        >
          <img
            src="/assets/icons/icon.svg"
            alt="icon"
            className="absolute left-6"
          />
          <div className="cW">{title}</div>
        </div>
      );
    } else {
      return (
        <div
          className="hidden md:flex items-center justify-center border-solid border-white rounded bgW px-5 py-2 relative"
          style={{ width: "280px", height: "68px" }}
          onClick={() => setCurrentCard(index)}
        >
          <img
            src="/assets/icons/icon.svg"
            alt="icon"
            className="absolute left-6"
          />
          <div className="cCnBlue">{title}</div>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-row px-2 md:px-10 py-16 items-center justify-center gap-1 md:gap-8">
      <LeftOutlined
        onClick={() => {
          if (currentCard !== 0) {
            setCurrentCard((prev) => prev - 1);
          } else {
            setCurrentCard(3);
          }
        }}
      />
      <div className="w-11/12 flex flex-nowrap gap-5 justify-center">
        {titles.map((e, index) => {
          return <Card title={e} key={index} />;
        })}
      </div>
      <RightOutlined
        onClick={() => {
          if (currentCard !== 3) {
            setCurrentCard((prev) => prev + 1);
          } else {
            setCurrentCard(0);
          }
        }}
      />
    </div>
  );
};

export default Index;
