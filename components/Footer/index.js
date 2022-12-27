import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col bgRkGreen cD">
      <div className="flex flex-col justify-start gap-5 px-10 pt-20 bgLightRkGreen md:flex-row md:px-20">
        <img src="/assets/icons/LOGO_DEVELOPE_rK-12.png" alt="logo" className="mb-4" height={80} width={80}/>
      </div>
      <div className="flex flex-col justify-center gap-5 px-10 pb-10 bgLightRkGreen md:flex-row md:gap-10 lg:gap-32 md:px-20">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold">Ruang Kultur</p>
          <p className="text-xs">
            Ruang Kultur  is a digital creative and communicative talk about Art, Entertainment, Lifestyle and things currently happening.{" "}
          </p>
        </div>
        <div className="inline border border-inherit md:hidden"></div>
        <div className="w-full md:w-1/2 lg:w-1/5">
          <p className="text-lg font-bold">About Us</p>
          <div className="flex flex-row">
            <div className="w-1/2">
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturatif</Link>
              </div>
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturama</Link>
              </div>
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturaga</Link>
              </div>
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturnema</Link>
              </div>
            </div>
            <div className="w-1/2">
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturaga</Link>
              </div>
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturmain</Link>
              </div>
              <div className="py-2">
                <Link href="/" className="text-xs">Kulturbisnis</Link>
              </div>
              <div className="py-2">
                <Link href="/" className="text-xs">Shop</Link>
              </div>
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
        <div className="inline border border-inherit md:hidden"></div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold">Subcribe for Get Hot News!</p>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row">
              <Input placeholder="Basic usage" />
              <Button className="ml-1 btnLightCnBlue">
                Submit
              </Button>
            </div>
            <p className="text-xs">
              By clicking “SUBSCRIBE” you agree to get email from Ruang Kultur and accept our web term of use, privacy and cookies policy.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between align-middle">
        <div className="p-4 col-20">
          <p className="px-5 text-xs text-center">
            © 2022 Ruang Kultur. All rights reserved.
          </p>
        </div>
        <div className="p-4 col-4">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            {/* <p className="text-lg font-bold text-center">Media Sosial</p> */}
            <div className="flex flex-row justify-center gap-2">
              <YoutubeOutlined style={{ fontSize: '22px' }} />
              <FacebookOutlined style={{ fontSize: '22px' }} />
              <TwitterOutlined style={{ fontSize: '22px' }} />
              <InstagramOutlined style={{ fontSize: '22px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
