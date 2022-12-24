import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const CardClass = ({ title, category, date, kuota, imageName, width }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl mt-5 drop-shadow bgW flex flex-col justify-start"
      style={{
        height: "100%",
        aspectRatio: "2",
        // minWidth: "428px",
        width: width === "full" ? "100%" : "33.3%",
      }}
    >
      <img
        src={`/images/${imageName}.png`}
        alt="img"
        className="rounded-t-2xl w-full"
        style={{ height: "172px" }}
      />
      <div className="flex flex-col">
        <div
          className="flex justify-center items-center"
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
        </div>
        <div
          style={{
            transform: "translate(0px, -20px)",
          }}
          className="px-5"
        >
          <p className="mb-1 font-semibold">{title}</p>
          <p className="font-light text-sm cDarkGrey">{category}</p>
          <div style={{ borderBottom: "1px solid lightgrey" }} />
          {hovered ? (
            <div className="flex px-5 justify-center items-center mt-6">
              <button className="btnCnBlueBorder w-full">Lihat</button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-start justify-center text-xs font-normal mt-2 cMedgrey">
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
              <button className="float-right btnLightCnBlue text-xs font-semibold">
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
