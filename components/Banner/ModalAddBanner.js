import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Input, Select, Checkbox, Radio, Switch, Upload, DatePicker } from 'antd';
import styled from 'styled-components';
// import { FetcherGet, requestPost, showSuksesCustom } from "../../utils/fetcher";
import { useAppState } from "../shared/AppProvider";
import { requestGet, requestPost, showSuksesCustom } from "../../utils/baseService";
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment';

const ModalAddBanner = ({ session, modalAdd, setModalAdd, onFinish = () => { } }) => {
    const { Option } = Select;
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);
    const [loadingPlacement, setLoadingPlacement] = useState(true);
    const [active, setActive] = useState()
    const [typeBanner, setTypeBanner] = useState()
    const [placementBanner, setPlacementBanner] = useState()
    const [fileList, setFileList] = useState([]);
    const [dataTypeBanner, setDataTypeBanner] = useState()
    const [dataPlacement, setDataPlacement] = useState()
    const [periode, setPeriode] = useState();
    const [type, setType] = useState()
    const [idPlacement, setIdPlacement] = useState()

    const [formAddBanner] = Form.useForm();

    const handleOk = () => {
        formAddBanner.validateFields().then(async values => {
            setLoading(true);
            const formData = new FormData();
            formData.append('owner', values.owner ?? "-");
            formData.append('url', values.url ?? "-");
            formData.append('type', typeBanner ?? "-");
            formData.append('isActive', active);
            if (placementBanner.length > 0) {
              placementBanner.forEach((placement) =>{
                formData.append('placements[]', placement);
              })
            }

            if (fileList.length > 0) {
                fileList.forEach((file) => {
                    formData.append('image', file);
                });
            }

            if (periode) {
                if (periode?.[0]) {
                    formData.append('startDate', moment(periode[0]));
                }
                if (periode?.[1]) {
                    formData.append('endDate', moment(periode[1]));
                }
            }

            var datar = await requestPost(
                session,
                process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/banner/create',
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

    const uploadSettings = {
        name: "file",
        multiple: true,
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

    const fetchDataTypeBanner = async () => {
        setLoading(true);
        var params = {};

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/banner-type/list",
          {
            params: params,
          }
        );
        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setDataTypeBanner(datar?.data?.data ?? []);
        }
    }

    const fetchDataPlacement = async (id) => {
        setLoadingPlacement(true);

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/banner-type/get/${id}`,
        );
        setLoadingPlacement(false);

        if (datar?.data?.statusCode == 200) {
          setDataPlacement(datar?.data?.data?.placements ?? []);
        }
    }

    useEffect(() => {
        fetchDataTypeBanner();
        // fetchDataPlacement();
        return () => { };
    }, [state]);

    useEffect(() => {
      if(idPlacement){
        fetchDataPlacement(idPlacement);
      }
    }, [idPlacement])


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
                        <h1 className="text-center headerPage">Create Banner</h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>
                <Row type="flex" align="middle" justify="center">
                    <Content>
                        <Form layout="vertical" form={formAddBanner} className="formDaftar">
                          <>
                            <p style={StyleHeaderInput}>
                                Owner
                            </p>
                            <Form.Item
                                name="owner"
                                style={{ marginBottom: '12px' }}
                                rules={[{ required: true, message: 'Harap Lengkapi Nama!' }]}
                            >
                                <Input type="text" placeholder="Nama" />
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                                Banner type
                            </p>
                            <Form.Item
                              name="type"
                              style={{ marginBottom: '12px' }}
                              rules={[
                                  { required: true, message: 'Harap Lengkapi Data!' },
                              ]}
                            >
                              <Select
                                showSearch
                                placeholder="Pilih Type"
                                optionFilterProp="children"
                                onChange={(value, option) => {
                                    setTypeBanner(value, option)
                                    setIdPlacement(value)
                                }}
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                              >
                                {dataTypeBanner?.map((k,v) => {
                                  return <Option key={v} value={k._id}>{k.name}</Option>
                                })}
                              </Select>
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                                Placement Banner
                            </p>
                            <Form.Item
                              name="placement"
                              style={{ marginBottom: '12px' }}
                              rules={[
                                  { required: true, message: 'Harap Lengkapi Data!' },
                              ]}
                            >
                              <Select
                                showSearch
                                mode="multiple"
                                disabled={loadingPlacement}
                                placeholder="Pilih Placement Banner"
                                optionFilterProp="children"
                                onChange={(value, option) => {
                                    setPlacementBanner(value, option)
                                }}
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                              >
                                {dataPlacement?.map((k,v) => {
                                  return <Option key={v} value={k._id}>{k.name}</Option>
                                })}
                              </Select>
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                              Date
                            </p>
                            <Form.Item
                              name="date"
                              rules={[
                                  { required: true, message: 'Harap Lengkapi Data!' },
                              ]}
                            >
                              <DatePicker.RangePicker
                                style={{
                                    width: "100%",
                                }}
                                suffixIcon={
                                    <Row align="middle">
                                        <img alt="dropdown" src="/images/icon/arrow-down-blue.svg" />
                                    </Row>
                                }
                                onChange={(value) => {
                                    setPeriode(value);
                                }}
                            />
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                                Url
                            </p>
                            <Form.Item
                                name="url"
                                style={{ marginBottom: '12px' }}
                                rules={[{ required: true, message: 'Harap Lengkapi Url!' }]}
                            >
                                <Input type="text" placeholder="url" />
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                              Active
                            </p>
                            <Form.Item
                              name="isActive"
                              rules={[
                                  { required: true, message: 'Harap Lengkapi Data!' },
                              ]}
                            >
                              <Radio.Group
                                  onChange={(e) => {
                                    setActive(e.target.value)
                                  }}
                                  options={[
                                      { label: 'Yes', value: true },
                                      { label: 'No', value: false }
                                  ]}
                                  value={active}
                              />
                            </Form.Item>
                          </>
                          <>
                            <p style={StyleHeaderInput}>
                                Image
                            </p>
                            <Form.Item
                                name="dokumen"
                                rules={[
                                    { required: true, message: 'Harap Lengkapi Data!' },
                                ]}
                                style={{ marginBottom: '12px' }}
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
export default ModalAddBanner;
