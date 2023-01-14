import { useEffect, useState } from "react";
import { Table, Spin, Tag, Button, Modal, DatePicker, Row, Col, notification, Card, Form, Input, Menu, Dropdown, Select, Radio } from 'antd';
import styled from 'styled-components';
// import { requestPut, showSuksesCustom } from "../../utils/fetcher";
import { useAppState } from "../shared/AppProvider";
import TextArea from "antd/lib/input/TextArea";
import { requestPut, showSuksesCustom } from "../../utils/baseService";

const ModalEditCategory = ({ session, dataEdit, modalEdit, setModalEdit, onFinish = () => { } }) => {
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState()

    const [formEdit] = Form.useForm();

    useEffect(() => {
        // console.log(dataEdit)
        formEdit.setFieldsValue({
            name: dataEdit.name,
            description: dataEdit.description,
            isActive: dataEdit.isActive
        });

    }, [dataEdit])

    const handleOk = () => {
        formEdit.validateFields().then(async values => {
            setLoading(true);
            const param = {
                name: values.name,
                description: values.description,
                isActive: status ?? dataEdit.status
            };

            var datar = await requestPut(
                session,
                process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/category/update/' + dataEdit._id,
                param
            );
            setLoading(false);

            if (datar?.data?.statusCode < 400) {
                showSuksesCustom("Success!", datar?.message);
                onFinish()
                setModalEdit(false);
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

    return (
        <>
            <Modal
                visible={modalEdit}
                onOk={() => {
                    setModalEdit(false);
                }}
                onCancel={() => {
                    setModalEdit(false);
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
                        onClick={() => { setModalEdit(false); }}
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
                        <h1 className="text-center headerPage">Edit Category</h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>
                <Row type="flex" align="middle" justify="center">
                    <Content>
                        <Form layout="vertical" form={formEdit} className="formDaftar">
                            <>
                                <p style={StyleHeaderInput}>
                                    Nama*
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
                                    Description
                                </p>
                                <Form.Item
                                    name="description"
                                    style={{ marginBottom: '12px' }}
                                >
                                    <TextArea type="text" placeholder="Username" />
                                </Form.Item>
                            </>

                            <>
                                <p style={StyleHeaderInput}>
                                    Status
                                </p>
                                <Form.Item
                                    name="isActive"
                                    style={{ marginBottom: '12px' }}
                                >
                                    <Radio.Group
                                        options={[
                                            { label: 'Active', value: true },
                                            { label: 'Inactive', value: false },
                                        ]}
                                        onChange={(e) => {
                                            setStatus(e.target.value)
                                        }}
                                        value={status}
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
export default ModalEditCategory;
