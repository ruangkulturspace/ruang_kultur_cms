import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import LandingPage from "../components/Layouts/LandingPageLayout";
import CardLates from "../components/Cards/CardLates";
import Carousel from "../components/Carousel";
import AdsSection from "../components/AdsSection";

import { useRouter } from "next/router";
import BillboardBanner from "../components/Advertise/BillboardBanner";
import LeaderBoardBanner from "../components/Advertise/LeaderBoardBanner";
import SuperLeaderBoardBanner from "../components/Advertise/SuperLeaderBoardBanner";
import SkinAds from "../components/Advertise/SkinAds";
import { requestGetWithoutSession } from "../utils/baseService";
import FixHangingBottom from "../components/Advertise/FixHangingBottom";
import ExpandAble from "../components/Advertise/ExpandAble";
import HalfPage from "../components/Advertise/HalfPage";

const Home = ({session}) => {
  const router = useRouter();

  const [dataBanner, setDataBanner] = useState([])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataBanner({})
  }, [])

  const fetchDataBanner = async ({}) => {
      setLoading(true);
      var params = {};

      params.page = 1;
      params.isActive = true;
      params.placement = "HOMEPAGE"

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/banner/list`,
        {
          params: params,
        }
      );

      setLoading(false);

      if (datar?.data?.statusCode == 200) {
        setDataBanner(datar?.data?.data ?? []);
      }
  }

  const retangelBanner1 = dataBanner?.filter(element => element?.type?.name === "MEDIUM RECTANGLE 1");
  const retangelBanner2 = dataBanner?.filter(element => element?.type?.name === "MEDIUM RECTANGLE 2");
  const billboardBanner = dataBanner?.filter(element => element?.type?.name === "BILLBOARD");
  const skinAdsBanner = dataBanner?.filter(element => element?.type?.name === "SKIN AD");
  const fixHangingBottomBanner = dataBanner?.filter(element => element?.type?.name === "FIX HANGING BOTTOM");
  const leaderBoardBanner = dataBanner?.filter(element => element?.type?.name === "LEADERBOARD");
  const superLeaderBoardBanner = dataBanner?.filter(element => element?.type?.name === "SUPER LEADERBOARD");
  const expandAble = dataBanner?.filter(element => element?.type?.name === "EXPANDABLE");
  const halfPage = dataBanner?.filter(element => element?.type?.name === "HALF PAGE");

  return (
    <>
      <LandingPage title="Beranda">
      {billboardBanner?.map((e, index) => {
          return (
            <BillboardBanner
              key={index}
              data={e}
            />
          )
        })}
        {leaderBoardBanner?.map((e, index) => {
          return (
            <LeaderBoardBanner
              key={index}
              data={e}
            />
          )
        })}
        {superLeaderBoardBanner?.map((e, index) => {
          return (
            <SuperLeaderBoardBanner
              key={index}
              data={e}
            />
          )
        })}
        {skinAdsBanner?.map((e, index) => {
          return (
            <SkinAds
              key={index}
              data={e}
            />
          )
        })}
        <Carousel />
        <CardLates
          title="List Kelas"
        />
        <AdsSection />
        {fixHangingBottomBanner?.map((e, index) => {
          return (
            <FixHangingBottom
              key={index}
              data={e}
            />
          )
        })}
        {expandAble?.map((e, index) => {
          return (
            <ExpandAble
              key={index}
              data={e}
            />
          )
        })}
        {halfPage?.map((e, index) => {
          return (
            <HalfPage
              key={index}
              data={e}
            />
          )
        })}
      </LandingPage>
    </>
  );
};

export default Home;
