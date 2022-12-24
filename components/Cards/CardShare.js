import {
  FacebookFilled,
  FacebookOutlined,
  LinkedinFilled,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import React from "react";

const CardShare = () => {
  return (
    <div className="bgW rounded-lg border border-solid border-grey w-11/12 md:w-full mb-10">
      <p className="font-semibold text-xl my-5">Bagikan Artikel</p>
      <div className="flex flex-row flex-wrap gap-2 justify-center mb-5">
        <div
          className="flex justify-center items-center py-2 px-3 cW rounded cursor-pointer hover:drop-shadow-lg"
          style={{ backgroundColor: "var(--twitterblue)" }}
        >
          <TwitterOutlined /> <p className="font-semibold ml-2 mb-0 hidden lg:inline">Twitter</p>
        </div>
        <div
          className="flex justify-center items-center py-2 px-3 cW rounded cursor-pointer hover:drop-shadow-lg"
          style={{ backgroundColor: "var(--fbblue)" }}
        >
          <FacebookFilled /> <p className="font-semibold ml-2 mb-0 hidden lg:inline">Facebook</p>
        </div>
        <div
          className="flex justify-center items-center py-2 px-3 cW rounded cursor-pointer hover:drop-shadow-lg"
          style={{ backgroundColor: "var(--whatsappgreen)" }}
        >
          <WhatsAppOutlined />{" "}
          <p className="font-semibold ml-2 mb-0 hidden lg:inline">Whatsapp</p>
        </div>
        <div
          className="flex justify-center items-center py-2 px-3 cW rounded cursor-pointer hover:drop-shadow-lg"
          style={{ backgroundColor: "var(--linkedinblue)" }}
        >
          <LinkedinFilled /> <p className="font-semibold ml-2 mb-0 hidden lg:inline">Linkedin</p>
        </div>
      </div>
    </div>
  );
};

export default CardShare;
