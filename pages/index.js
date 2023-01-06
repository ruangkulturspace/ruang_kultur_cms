import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import LandingPage from "../components/Layouts/LandingPageLayout";
import CardLates from "../components/Cards/CardLates";
import Carousel from "../components/Carousel";
import AdsSection from "../components/AdsSection";

import { useRouter } from "next/router";


const Home = ({session}) => {
  const [currentCard, setCurrentCard] = useState(0);
  const router = useRouter();

  return (
    <>
      <LandingPage title="Beranda">
        <Carousel />
        <CardLates
          title="List Kelas"
          cta="Lates"
          cta2=""
          cardInfo={[
            {
              title: "Desain Grafis Menggunakan Figma",
              category: "Kulturama",
              date: "25 Mei 2022 - 25 Juli 2022",
              kuota: "1500 peserta",
              imageName: "design",
            },
            {
              title: "Membuat Website dengan Laravel",
              category: "Kulturaga",
              date: "25 Mei 2022 - 25 Juli 2022",
              kuota: "1500 peserta",
              imageName: "design2",
            },
            {
              title: "Video Editing Menggunakan Adobe Premiere",
              category: "Kulturaga",
              date: "25 Mei 2022 - 25 Juli 2022",
              kuota: "1500 peserta",
              imageName: "design3",
            },
          ]}
        />
        <AdsSection />
      </LandingPage>
    </>
  );
};

export default Home;
