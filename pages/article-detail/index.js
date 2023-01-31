import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import dynamic from "next/dynamic";
import { Button, Input, Form, Card, Select, DatePicker, Checkbox, Radio, Upload, Spin, Row, Col, Image, Divider } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet, requestPostFormData, showSuksesCustom } from "../../utils/baseService";
import { useRouter } from "next/router";
import { CloudUploadOutlined, ReloadOutlined, SaveFilled, UploadOutlined } from "@ant-design/icons";

const ArticleDetail = ({ session }) => {
    const router = useRouter()
    const { id } = router.query
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [dataDetail, setDataDetail] = useState({})

    const fetchDataDetailArticle = async (idArticle) => {
        setLoading(true);

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/article/get/${idArticle}`,
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
      <div className="p-6 rounded-lg bgW">
        <div className="items-center justify-between w-full">
          <h1 className="text-3xl font-bold">Detail Article</h1>
          <hr className="mb-3" />
          <Spin tip="Memuat..." size="large" spinning={state.loading || loading}>
            <div className="flex flex-col flex-wrap md:flex-row">
              <Col span={18} className="pb-2">
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Type</Col>
                    <Col span={16}>: {dataDetail?.type?.name ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Kanal</Col>
                    <Col span={16}>: {dataDetail?.category?.name ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Judul</Col>
                    <Col span={16}>: {dataDetail?.title ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Reporter</Col>
                    <Col span={16}>: {dataDetail?.reporter ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Editor</Col>
                    <Col span={16}>: {dataDetail?.editor ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Date</Col>
                    <Col span={16}>: {moment(dataDetail?.date).format("DD-MMMM-YYYY")}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Onlanding Page</Col>
                    <Col span={16}>
                      <Radio.Group
                        options={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false }
                        ]}
                        value={dataDetail.isOnLandingPage}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Active</Col>
                    <Col span={16}>
                      <Radio.Group
                        options={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false }
                        ]}
                        value={dataDetail.isActive}
                      />
                    </Col>
                  </Row>
                </div>

              </Col>
              <Col span={6}>
                <Row>
                  <Col span={24}>Main image</Col>
                  <Col span={24}>
                    <Image
                      width={200}
                      alt={dataDetail?.image?.pathWithFilename}
                      src={dataDetail?.image?.completedUrl}
                    />
                  </Col>
                </Row>
              </Col>
            </div>
            <Divider />
            <div className="flex flex-row flex-wrap">
              <Col span={24} className="pb-2">Content :</Col>
              <Col span={24} className="pb-2">
                <div className="text-container" dangerouslySetInnerHTML={{ __html: dataDetail?.content }} />
              </Col>
            </div>
          </Spin>

        </div>
      </div>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default ArticleDetail;
