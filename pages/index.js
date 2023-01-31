import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import LandingPage from "../components/Layouts/LandingPageLayout";
import CardLates from "../components/Cards/CardLates";
import Carousel from "../components/Carousel";
import AdsSection from "../components/AdsSection";

import { useRouter } from "next/router";
import { requestGetWithoutSession } from "../utils/baseService";
import { useAppState } from "../components/shared/AppProvider";


const Home = ({session}) => {
  const [currentCard, setCurrentCard] = useState(0);
  const router = useRouter();

  const [state, dispatch] = useAppState();
  const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 6,
      total: 0,
      position: ["none", "bottomCenter"],
  });

  const [pageData, setPageData] = useState([]);
  const [sorter, setSorter] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetchDataArticle();
      return () => { };
  }, [state]);

  const fetchDataArticle = async (
    page = pagination.current,
    limit = pagination.pageSize,
    isExport = false,
  ) => {
      setLoading(true);
      var params = {};

      if (!isExport) {
        params.page = page;
        params.perPage = limit;
        params.sort = "date@desc"
        params.isActive = true
      }

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
        {
          params: params,
        }
      );

      setLoading(false);

      if (datar?.data?.statusCode == 200) {
        setPageData(datar?.data?.data ?? []);
        // setPagination({
        //   current: datar?.data?.currentPage ?? 1,
        //   pageSize: datar?.data?.perPage,
        //   total: datar?.data?.totalData ?? 0,
        //   position: ["none", "bottomCenter"],
        // });
      }
  }

  return (
    <>
      <LandingPage title="Beranda">
        <Carousel />
        <CardLates
          title="List Kelas"
          cta="Lates"
          cta2=""
          cardInfo={pageData}
        />
        <AdsSection />
      </LandingPage>
    </>
  );
};

export default Home;
