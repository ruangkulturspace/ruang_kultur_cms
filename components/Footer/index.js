import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bgRkGreen flex flex-col cD">
      <div className="bgLightRkGreen flex flex-col md:flex-row justify-start gap-5 pt-20 px-10 md:px-20">
        <img src="/assets/icons/LOGO_DEVELOPE_rK-12.png" alt="logo" className="mb-4" height={80} width={80}/>
      </div>
      <div className="bgLightRkGreen flex flex-col md:flex-row justify-center gap-5 md:gap-10 lg:gap-32 px-10 md:px-20 pb-10">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold">Ruang Kultur</p>
          <p className="text-xs">
            Ruang Kultur is a media that produces and distributes to Sokul{" "}
          </p>
        </div>
        <div className="border border-inherit inline md:hidden"></div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold">About Us</p>
          <div className="flex flex-col">
            <div className="py-2">
              <Link href="/" className="text-xs">Blog</Link>
            </div>
            <div className="py-2">
              <Link href="/" className="text-xs">Blog</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold">Lainnya</p>
          <div className="flex flex-col">
            <div className="py-2">
              <Link href="/" className="text-xs">FAQ</Link>
            </div>
            <div className="py-2">
              <Link href="/" className="text-xs">Kebijakan Privasi</Link>
            </div>
            <div className="py-2">
              <Link href="/" className="text-xs">Syarat dan Ketentuan</Link>
            </div>
            <div className="py-2">
              <Link href="/" className="text-xs">About Us</Link>
            </div>
          </div>
        </div>
        <div className="border border-inherit inline md:hidden"></div>
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col justify-center">
          <p className="text-lg font-bold text-center">Subcribe for Get Hot News!</p>
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
      <div className="flex flex-row justify-between align-middle">
        <div className="col-20 p-4">
          <p className="text-xs px-5 text-center">
            © 2022 Ruang Kultur. All rights reserved.
          </p>
        </div>
        <div className="col-4 p-4">
          <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col">
            {/* <p className="text-lg font-bold text-center">Media Sosial</p> */}
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
      </div>
    </div>
  );
};

export default Footer;
