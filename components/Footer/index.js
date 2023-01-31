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
        <div className="w-full md:w-1/2 lg:w-2/5">
          <p className="text-lg font-bold">Ruang Kultur</p>
          <p className="text-xs">
            Ruang Kultur  is a digital creative and communicative talk about Art, Entertainment, Lifestyle and things currently happening.{" "}
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/5">
          <p className="text-lg font-bold">About Us</p>
          <div className="flex flex-row">
            <div className="w-1/2">
              <div className="py-2">
                <Link href="/kanal?type=KULTURATIF" className="text-xs">Kulturatif</Link>
              </div>
              <div className="py-2">
                <Link href="/kanal?type=KULTURAMA" className="text-xs">Kulturama</Link>
              </div>
              <div className="py-2">
                <Link href="/kanal?type=KULTUR RAGA" className="text-xs">Kulturaga</Link>
              </div>
              <div className="py-2">
                <Link href="/kanal?type=KULTURNEMA" className="text-xs">Kulturnema</Link>
              </div>
            </div>
            <div className="w-1/2">
              <div className="py-2">
                <Link href="/kanal?type=KULTURAGA" className="text-xs">Kulturaga</Link>
              </div>
              <div className="py-2">
                <Link href="/kanal?type=KULTUR MAIN" className="text-xs">Kulturmain</Link>
              </div>
              <div className="py-2">
                <Link href="/kanal?type=KULTURBISNIS" className="text-xs">Kulturbisnis</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-2/5">
          <p className="mb-3 text-lg font-bold">Network</p>
          <div className="flex flex-col justify-center gap-2">
            <a className="mt-3 text-lg font-bold" href="https://dewatacollectivestudio.com/">
              DEWATA COLLECTIVE
            </a>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-2/5">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=dewata collective&t=&z=10&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
              </iframe>
            </div>
          </div>
          <p className="mt-3 text-sm">Sudirman Park, Jl K.H Mas Mansyur blok B8, RT.12/RW.11, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10250</p>
          {/* <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row">
              <Input placeholder="Basic usage" />
              <Button className="ml-1 btnLightCnBlue">
                Submit
              </Button>
            </div>
            <p className="mt-3 text-xs">
              By clicking “SUBSCRIBE” you agree to get email from Ruang Kultur and accept our web term of use, privacy and cookies policy.
            </p>
          </div> */}
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
