import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Select, Radio, Spin, Row, Col, Image } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet, requestPostFormData, showSuksesCustom } from "../../utils/baseService";
import { useRouter } from "next/router";

const ArticleDetail = ({ session }) => {
    const router = useRouter()
    const { Option } = Select;
    const { id } = router.query
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [dataDetail, setDataDetail] = useState({})

    const fetchDataDetailArticle = async (idArticle) => {
        setLoading(true);

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/banner/get/${idArticle}`,
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
          <h1 className="text-3xl font-bold">Detail Banner</h1>
          <hr className="mb-3" />
          <Spin tip="Memuat..." size="large" spinning={state.loading || loading}>
            <div className="flex flex-col flex-wrap md:flex-row">
              <Col span={18} className="pb-2">
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Owner</Col>
                    <Col span={16}>: {dataDetail?.owner ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Url</Col>
                    <Col span={16}>: {dataDetail?.url ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Type</Col>
                    <Col span={16}>: {dataDetail?.type?.name ?? "-"}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Placement</Col>
                    <Col span={16}>
                      <>
                        <ul style={{ paddingLeft: '1.1rem' }}>
                          {dataDetail?.placements?.map((k,v) => {
                            return (
                              <li key={v}>
                                {k?.name ?? "-"}
                              </li>
                            )
                          })}
                        </ul>
                      </>
                    </Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>Start Date</Col>
                    <Col span={16}>: {moment(dataDetail?.startDate).format("DD-MMMM-YYYY")}</Col>
                  </Row>
                </div>
                <div className="w-full px-0 mt-3">
                  <Row>
                    <Col span={8}>End Date</Col>
                    <Col span={16}>: {moment(dataDetail?.endDate).format("DD-MMMM-YYYY")}</Col>
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
                  <Col span={24}>Image</Col>
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
