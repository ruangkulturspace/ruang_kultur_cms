import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Input, Select, Checkbox, Radio, Switch, Upload, DatePicker } from 'antd';
import styled from 'styled-components';
// import { FetcherGet, requestPost, showSuksesCustom } from "../../utils/fetcher";
import { useAppState } from "../shared/AppProvider";
import { requestGet, requestPost, showSuksesCustom } from "../../utils/baseService";
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment';

const ModalAddNewest = ({ session, modalAdd, setModalAdd, articleId, onFinish = () => { } }) => {
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [formAddBanner] = Form.useForm();

    const [fileList, setFileList] = useState([]);

    const uploadSettings = {
        name: "file",
        multiple: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        beforeUpload: function (file) {
            setFileList([...fileList, file]);
            return false;
        },
        fileList: fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
    };

    const handleOk = () => {
        formAddBanner.validateFields().then(async values => {
            setLoading(true);
            const formData = new FormData();

            if (fileList.length > 0) {
                fileList.forEach((file) => {
                    formData.append('file', file);
                });
            }

            var datar = await requestPost(
                session,
                process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/article/update/${articleId}/image`,
                formData
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
                        Edit
                    </Button>,
                ]}
            >
                <Row gutter={[10, 10]} justify="center" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <h1 className="text-center headerPage">Update Main Image</h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>
                <Row type="flex" align="middle" justify="center">
                    <Content>
                        <Form layout="vertical" form={formAddBanner} className="formDaftar">
                          <>
                            <p style={StyleHeaderInput}>
                              Image
                            </p>
                            <Form.Item
                                name="dokumen"
                                style={{ marginBottom: '12px' }}
                                rules={[{ required: true, message: 'Harap Lengkapi Nama!' }]}
                            >
                                <Upload {...uploadSettings}>
                                    <Button style={{
                                        borderRadius: '4px',
                                        color: '#ffffff',
                                        background: "#33539E",
                                        boxShadow: '0px 2px 5px rgba(51, 83, 158, 0.2)',
                                        float: 'right',
                                        margin: "0",
                                    }}
                                        icon={<UploadOutlined />}>
                                        Click to Upload
                                    </Button>
                                </Upload>
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
