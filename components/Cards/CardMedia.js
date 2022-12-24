import React, { useState } from "react";

const CardMedia = ({ title, category, date, imageName, width }) => {
  console.log("console log nya imageName", imageName);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl mt-5 drop-shadow bgW flex flex-col justify-start"
      style={{
        height: "100%",
        // minWidth: "428px",
        width: width === "full" ? "100%" : "33.3%",
      }}
    >
      <img
        src={imageName
          ?.replace("public/upload/media", "v1/view")
          .replace("storage/upload/media", "v1/view")}
        alt="img"
        className="rounded-t-2xl w-full"
        style={{ height: width === "full" ? "250px" : "172px" }}
      />
      <div
        className="flex flex-col justify-center"
        style={
          width !== "full"
            ? { minHeight: "calc(90px + 0.5rem)" }
            : { height: width === "full" ? "calc(100% - 250px)" : "auto" }
        }
      >
        <div className="px-5 justify-center">
          <p className="mb-0 font-semibold">{title}</p>
          {hovered ? (
            <div className="flex px-5 py-4 justify-center items-center">
              <button className="btnCnBlueBorder w-full">Lihat</button>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <p className="mb-5 mr-2 py-6 cMedgrey font-normal">{date}</p>
              <button className="uppercase btnLightCnBlue text-xs font-semibold">
                {category}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardMedia;
