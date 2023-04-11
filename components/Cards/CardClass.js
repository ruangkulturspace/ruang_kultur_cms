import { ClockCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useAppState } from "../shared/AppProvider";

const CardClass = ({ title, category, date, kuota, imageName, width }) => {
  const [hovered, setHovered] = useState(false);
  const [state, dispatch] = useAppState();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col justify-start rounded-2xl drop-shadow bgW"
      style={{
        height: "90%",
        width: state.mobile === true ? "50vh" : "100%",
      }}
    >
      <img
        src={`${imageName}`}
        alt="img"
        className="w-full rounded-t-2xl"
        style={{ height: "200px" }}
      />
      <div className="flex flex-col">
        <div
          className="px-5 py-4"
        >
          <p className="mb-1 font-semibold text-truncate">{title}</p>
          <p className="text-sm font-light cDarkGrey">{category}</p>
          <div style={{ borderBottom: "1px solid lightgrey" }} />

          <div className="flex flex-col items-start justify-center mt-2 text-xs font-normal cMedgrey">
            <div className="flex flex-row items-center gap-2">
              <ClockCircleOutlined
                style={{ fontSize: "10px", color: "var(--cnblue)" }}
              />{" "}
              {date}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center mt-2 mb-5 text-xs font-normal cMedgrey">
            <div className="flex flex-row items-center gap-2">
              <button className="float-right text-xs font-semibold btnLightCnBlue">
                {category}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClass;
