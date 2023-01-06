import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const CardClass = ({ title, category, date, kuota, imageName, width }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col justify-start mt-5 rounded-2xl drop-shadow bgW"
      style={{
        height: "90%",
        width: "100%",
      }}
    >
      <img
        src={`/images/${imageName}.png`}
        alt="img"
        className="w-full rounded-t-2xl"
        style={{ height: "200px" }}
      />
      <div className="flex flex-col">
        {/* <div
          className="flex items-center justify-center"
          style={{
            height: "50px",
            width: "50px",
            transform: "translate(20px, -22.5px)",
            backgroundColor: "white",
            borderRadius: "100px",
          }}
        >
          <img
            src="/assets/icons/icon.svg"
            alt="icon"
            style={{ height: "45px", width: "45px", objectFit: "cover" }}
          />
        </div> */}
        <div
          className="px-5 pt-4"
        >
          <p className="mb-1 font-semibold">{title}</p>
          <p className="text-sm font-light cDarkGrey">{category}</p>
          <div style={{ borderBottom: "1px solid lightgrey" }} />

          <div className="flex flex-col items-start justify-center mt-2 mb-5 text-xs font-normal cMedgrey">
            <div className="flex flex-row items-center gap-2">
              <ClockCircleOutlined
                style={{ fontSize: "10px", color: "var(--cnblue)" }}
              />{" "}
              {date}
            </div>
            {/* <div className="flex flex-row items-center gap-2">
              <ClockCircleOutlined
                style={{ fontSize: "10px", color: "var(--cnblue)" }}
              />{" "}
              Kuota: {kuota}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClass;
