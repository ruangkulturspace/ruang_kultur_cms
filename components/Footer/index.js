import React from "react";

const Footer = () => {
  return (
    <div className="bgCnBlue flex flex-col justify-center cW items-center">
      <div className="bgCnBlue flex flex-col md:flex-row justify-center gap-5 md:gap-10 lg:gap-32 px-10 md:px-20 pt-20 pb-10">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <img src="/assets/icons/logo.png" alt="logo" className="mb-4" />
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Pellentesque habitant morbi tristique senectus et netus et
            malesuada. Tincidunt augue interdum velit euismod in pellentesque.{" "}
          </p>
        </div>
        <div className="border border-inherit inline md:hidden"></div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <p className="text-lg font-bold">Alamat</p>
          <p className="text-xs">
            Centennial Tower Lantai 42 Jl. Gatot Subroto No.Kav. 24-25,
            RT.2/RW.2, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta
            Selatan, Daerah Khusus Ibukota Jakarta 12930
          </p>
          <p className="text-xs">Tlp. (021) 31936590 FAX (021)31927516</p>
          <p className="text-xs">humas@baktikominfo.id</p>
        </div>
        <div className="border border-inherit inline md:hidden"></div>
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center">
          <p className="text-lg font-bold text-center">Media Sosial</p>
          <div className="flex flex-row gap-2 justify-center">
            <img
              src="/assets/icons/youtube.png"
              alt="youtube"
              className="cursor-pointer hover:drop-shadow-lg"
            />
            <img
              src="/assets/icons/facebook.png"
              alt="facebook"
              className="cursor-pointer hover:drop-shadow-lg"
            />
            <img
              src="/assets/icons/twitter.png"
              alt="twitter"
              className="cursor-pointer hover:drop-shadow-lg"
            />
            <img
              src="/assets/icons/instagram.png"
              alt="instagram"
              className="cursor-pointer hover:drop-shadow-lg"
            />
          </div>
        </div>
      </div>
      <p className="text-xs px-5 text-center">
        Copyright © 2022 | Badan Aksesibilitas Telekomunikasi dan Informasi
        Kominfo
      </p>
    </div>
  );
};

export default Footer;
