import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Input, Select, Checkbox, Radio, Switch } from 'antd';
import styled from 'styled-components';
// import { FetcherGet, requestPost, showSuksesCustom } from "../../utils/fetcher";
import { useAppState } from "../shared/AppProvider";
import { requestPost, showSuksesCustom } from "../../utils/baseService";

const ModalAddCategory = ({ session, modalAdd, setModalAdd, onFinish = () => { } }) => {
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState()

    const [formUserType] = Form.useForm();

    const handleOk = () => {
        formUserType.validateFields().then(async values => {
            setLoading(true);
            const param = {
                name: values.name,
                description: values.description
            };

            var datar = await requestPost(
                session,
                process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/category/create',
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
        formUserType.resetFields();
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
                        <h1 className="text-center headerPage">Create Category</h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>
                <Row type="flex" align="middle" justify="center">
                    <Content>
                        <Form layout="vertical" form={formUserType} className="formDaftar">
                          <>
                            <p style={StyleHeaderInput}>
                                Nama
                            </p>
                            <Form.Item
                                name="name"
                                style={{ marginBottom: '12px' }}
                                rules={[{ required: true, message: 'Harap Lengkapi Nama!' }]}
                            >
                                <Input type="text" placeholder="Nama" />
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                                Deskripsi
                            </p>
                            <Form.Item name="description"
                                style={{ marginBottom: '12px' }}
                                rules={[
                                    { required: true, message: 'Harap Lengkapi Keterangan!' }
                                ]}>
                                <Input.TextArea
                                    showCount maxLength={200}
                                    type="text"
                                    placeholder="Keterangan"
                                />
                            </Form.Item>
                          </>
                        </Form>
                    </Content>
                </Row>
            </Modal>
        </>
    )
}
export default ModalAddCategory;
