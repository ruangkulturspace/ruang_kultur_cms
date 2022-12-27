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
        height: "100%",
        // aspectRatio: "2",
        // minWidth: "428px",
        width: width === "full" ? "100%" : "33.3%",
      }}
    >
      <img
        src={`/images/${imageName}.png`}
        alt="img"
        className="w-full rounded-t-2xl"
        style={{ height: "172px" }}
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
          {hovered ? (
            <div className="flex items-center justify-center px-5 mt-6">
              <button className="w-full btnCnBlueBorder">Lihat</button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-start justify-center mt-2 text-xs font-normal cMedgrey">
                <div className="flex flex-row items-center gap-2">
                  <ClockCircleOutlined
                    style={{ fontSize: "10px", color: "var(--cnblue)" }}
                  />{" "}
                  Pendaftaran: {date}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <ClockCircleOutlined
                    style={{ fontSize: "10px", color: "var(--cnblue)" }}
                  />{" "}
                  Kuota: {kuota}
                </div>
              </div>
              <button className="float-right text-xs font-semibold btnLightCnBlue">
                DIBUKA
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardClass;
