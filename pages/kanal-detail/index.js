import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import dynamic from "next/dynamic";
import { Button, Input, Form, Card, Select, DatePicker, Checkbox, Radio, Upload, Spin, Row, Col, Image, Divider } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGetWithoutSession } from "../../utils/baseService";
import { useRouter } from "next/router";
import LandingPage from "../../components/Layouts/LandingPageLayout";

const KanalDetail = ({ session }) => {
    const router = useRouter()
    const { id } = router.query
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [dataDetail, setDataDetail] = useState({})

    const fetchDataDetailArticle = async (idArticle) => {
        setLoading(true);

        const datar = await requestGetWithoutSession(
          "",
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/get/${idArticle}`,
        );
        setLoading(false);
        if (datar?.data?.statusCode == 200 ?? false) {
          setDataDetail(datar?.data?.data);
        }
    }


    useEffect(() => {
      if (id) {
        fetchDataDetailArticle(id);
      }
    }, [id]);

    return (
      <LandingPage title="Kanal-Detail">
        <div className="flex flex-col p-10 font-semibold bgW md:p-20">

        </div>
      </LandingPage>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default KanalDetail;
