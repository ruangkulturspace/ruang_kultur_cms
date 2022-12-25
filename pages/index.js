import "antd/dist/antd.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import LandingPage from "../components/Layouts/LandingPageLayout";
import CardList from "../components/Cards/CardList";
import CardMediaList from "../components/Cards/CardMediaList";
import CardSteps from "../components/Cards/CardSteps";
import CardTestimonials from "../components/Cards/CardTestimonials";
import CardMenuSlider from "../components/Cards/CardMenuSlider";
import Carousel from "../components/Carousel";

import { useRouter } from "next/router";

import Progress from "../components/Progress/Progress";
import { useSelector, useDispatch } from "react-redux";
import { setIsAnimating } from "../slices/progress";

const Home = () => {
  const [currentCard, setCurrentCard] = useState(0);
  // const dispatch = useDispatch();
  // const isAnimating = useSelector((state) => state.progress.isAnimating);
  const router = useRouter();

  // useEffect(() => {
  //   const handleStart = () => {
  //     dispatch(setIsAnimating(true));
  //   };

  //   const handleStop = () => {
  //     dispatch(setIsAnimating(false));
  //   };

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleStop);
  //   router.events.on("routeChangeError", handleStop);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleStop);
  //     router.events.off("routeChangeError", handleStop);
  //   };
  // }, [router]);

  return (
    <>
      {/* <Progress isAnimating={isAnimating} /> */}
      <LandingPage title="Beranda">
        <Carousel />
        {/* <CardMenuSlider
          titles={["Multimedia", "Programming", "Network", "Wirausaha"]}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        /> */}
        {/* <CardList
          title="List Kelas"
          cta="Temukan Kelas Berdasarkan"
          cta2="Kategori yang Kami Sediakan"
          cardInfo={[
            {
              title: "Desain Grafis Menggunakan Figma",
              category: "Multimedia",
              date: "25 Mei 2022 - 25 Juli 2022",
              kuota: "1500 peserta",
              imageName: "design",
            },
            {
              title: "Membuat Website dengan Laravel",
              category: "Multimedia",
              date: "25 Mei 2022 - 25 Juli 2022",
              kuota: "1500 peserta",
              imageName: "design2",
            },
            {
              title: "Video Editing Menggunakan Adobe Premiere",
              category: "Multimedia",
              date: "25 Mei 2022 - 25 Juli 2022",
              kuota: "1500 peserta",
              imageName: "design3",
            },
          ]}
        /> */}
        {/* <CardSteps
          // title="Gabung Sekarang"
          cta="Tahapan Pendaftaran Kelas"
          cta2="Yang Disediakan Career Network"
          cardInfo={[
            {
              title: "Pendaftaran",
              desc: "Pilih pada pelatihan yang diinginkan dan lakukan pendaftaran",
              imageName: "pendaftaran",
            },
            {
              title: "SELEKSI",
              desc: "Ikuti tahap seleksi peserta (selekasi administrasi dan atau tes subtansi)",
              imageName: "seleksi",
            },
            {
              title: "VERIFIKASI",
              desc: "Penyelenggara akan melakukan verifikasi pada aplikasi pendaftaran anda",
              imageName: "verifikasi",
            },
            {
              title: "IKUT PELATIHAN",
              desc: "Ikuti pelatihan sesuai jadwal apabila telah dinyatakan sebagai peserta pelatihan",
              imageName: "ikut-pelatihan",
            },
          ]}
        /> */}
        {/* <CardMediaList
          title="Info Terbaru"
          cta="Rilis Media & Informasi"
          cta2="Terbaru dari Career Network"
        /> */}
        {/* <CardTestimonials
          title="Testimonials"
          cta="Berbagi Pengalaman & Karya"
          cta2="di Career Network"
          cardInfo={[
            {
              name: "Tri Prastia",
              occupation: "Mahasiswa",
              comment:
                "Mentornya keren cara menyampaikan setiap materinya juga detail dan mudah dipahami.",
              imageName: "person1",
            },
            {
              name: "M Reza Saputra",
              occupation: "Wirausaha",
              comment:
                "Kelas yang paling recommended pokoknya buat investasi ilmu di era revolusi industri 4.0.",
              imageName: "person2",
            },
            {
              name: "Chaerul Marwan",
              occupation: "Pelajar",
              comment:
                "Kelas yang sangat bermanfaat dan ilmu up-to-date dan yang paling penting biayanya terjangkau.",
              imageName: "person3",
            },
          ]}
        /> */}
      </LandingPage>
    </>
  );
};

export default Home;
