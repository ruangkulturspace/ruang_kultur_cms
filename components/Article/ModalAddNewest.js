import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Input, Select, Checkbox, Radio, Switch, Upload, DatePicker } from 'antd';
import styled from 'styled-components';
// import { FetcherGet, requestPost, showSuksesCustom } from "../../utils/fetcher";
import { useAppState } from "../shared/AppProvider";
import { requestGet, requestPost, showSuksesCustom } from "../../utils/baseService";
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment';

const ModalAddNewest = ({ session, modalAdd, setModalAdd, onFinish = () => { } }) => {
    const { Option } = Select;
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [titleArticle, setTitleArticle] = useState()
    const [idArticle, setIdArticle] = useState([])
    const [dataTitleArticle, setDataTitleArticle] = useState()

    const [formAddBanner] = Form.useForm();

    const handleOk = () => {
        formAddBanner.validateFields().then(async values => {
            setLoading(true);

            const param = {
              articleIds: idArticle
            }

            var datar = await requestPost(
                session,
                process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/article/active-bulk-on-landing-page',
                param
            );
            setLoading(false);

            if (datar?.data?.statusCode < 400) {
                showSuksesCustom("Success!", datar?.message);
                resetAll();
                onFinish()
                setModalAdd(false);
            }
        });
    }

    const fetchDataTitleArticle = async () => {
        setLoading(true);
        var params = {};

        params.isActive = true;

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/article/list",
          {
            params: params,
          }
        );
        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setDataTitleArticle(datar?.data?.data ?? []);
        }
    }

    useEffect(() => {
        fetchDataTitleArticle();
    }, []);

    const Content = styled.div`
        max-width: 400px;
        z-index: 2;
        min-width: 300px;
    `;

    const StyleHeaderInput = {
        color: "#6B83A3",
        fontSize: "14px",
        fontWeight: "400",
        margin: "0px"
    }

    const resetAll = () => {
        formAddBanner.resetFields();
    }

    return (
        <>
            <Modal
                visible={modalAdd}
                onOk={() => {
                    setModalAdd(false);
                }}
                onCancel={() => {
                    setModalAdd(false);
                }}
                width={'350px'}
                title={null}
                centered={true}
                footer={[
                    <Button
                        style={{
                            color: '#33539E',
                            background: '#fff',
                            borderRadius: '4px',
                            borderColor: '#33539E',
                        }}
                        key="back"
                        onClick={() => { resetAll(); setModalAdd(false); }}
                    >
                        Cancel
                    </Button>,
                    <Button
                        style={{
                            color: '#fff',
                            background: '#33539E',
                            borderRadius: '4px',
                        }}
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Tambah
                    </Button>,
                ]}
            >
                <Row gutter={[10, 10]} justify="center" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <h1 className="text-center headerPage">Create Newest Banner</h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>
                <Row type="flex" align="middle" justify="center">
                    <Content>
                        <Form layout="vertical" form={formAddBanner} className="formDaftar">
                          <>
                            <p style={StyleHeaderInput}>
                              Title Article
                            </p>
                            <Form.Item
                                name="articleIds"
                                style={{ marginBottom: '12px' }}
                                rules={[{ required: true, message: 'Harap Lengkapi Nama!' }]}
                            >
                                <Select
                                  showSearch
                                  mode="multiple"
                                  placeholder="Pilih Title Article"
                                  optionFilterProp="children"
                                  onChange={(value, option) => {
                                      setTitleArticle(value, option)
                                      setIdArticle(value)
                                  }}
                                  filterOption={(input, option) =>
                                    option.children
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                >
                                  {dataTitleArticle?.map((k,v) => {
                                    return <Option key={v} value={k._id}>{k.title}</Option>
                                  })}
                                </Select>
                            </Form.Item>
                          </>

                        </Form>
                    </Content>
                </Row>
            </Modal>
        </>
    )
}
export default ModalAddNewest;
