import { useEffect, useState } from "react";
import { Table, Spin, Tag, Button, Modal, DatePicker, Row, Col, notification, Card, Form, Input, Menu, Dropdown, Select, Radio, Upload } from 'antd';
import styled from 'styled-components';
import { useAppState } from "../shared/AppProvider";
import moment from 'moment';
import { requestGet, requestPut, showSuksesCustom } from "../../utils/baseService";

const ModalEditBanner = ({ session, dataEdit, modalEdit, setModalEdit, onFinish = () => { } }) => {
    const { Option } = Select;
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);
    const [typeBanner, setTypeBanner] = useState()
    const [placementBanner, setPlacementBanner] = useState()
    const [dataTypeBanner, setDataTypeBanner] = useState()
    const [dataPlacement, setDataPlacement] = useState()
    const [periode, setPeriode] = useState();
    const [type, setType] = useState()
    const [idPlacement, setIdPlacement] = useState()

    const [formEdit] = Form.useForm();

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
        setLoading(true);

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/banner-type/get/${id}`,
        );
        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setDataPlacement(datar?.data?.data?.placements ?? []);
        }
    }

    useEffect(() => {
        fetchDataTypeBanner();
        return () => { };
    }, [state]);

    useEffect(() => {
      setPeriode([dataEdit.startDate, dataEdit.endDate])
      setIdPlacement(dataEdit?.type?._id)
      formEdit.setFieldsValue({
          owner: dataEdit?.owner,
          type: dataEdit?.type?.name,
          placement: dataEdit?.placements?.map((k,v) => k.name),
          date: [moment(dataEdit.startDate), moment(dataEdit.endDate)]
      });
    }, [dataEdit])

    useEffect(() => {
      if(idPlacement){
        fetchDataPlacement(idPlacement);
      }
    }, [idPlacement])

    const handleOk = () => {
        formEdit.validateFields().then(async values => {
            setLoading(true);
            const param = {
                owner: values?.owner,
                type: typeBanner ?? dataEdit?.type?._id,
                placements: placementBanner ?? dataEdit?.placements?.map((k,v) => k._id),
            };

            if (periode) {
                if (periode?.[0]) {
                    param.startDate = moment(periode[0])
                }
                if (periode?.[1]) {
                    param.endDate = moment(periode[1])
                }
            }

            var datar = await requestPut(
                session,
                process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/banner/update/' + dataEdit._id,
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
                        <h1 className="text-center headerPage">Edit Banner</h1>
                    </Col>
                </Row>

                <div style={{ height: '20px' }}></div>
                <Row type="flex" align="middle" justify="center">
                    <Content>
                        <Form layout="vertical" form={formEdit} className="formDaftar">
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
                                // defaultValue={periode}
                            />
                            </Form.Item>
                          </>
                          {/* <>
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
                          </> */}
                        </Form>
                    </Content>
                </Row>
            </Modal>
        </>
    )
}
export default ModalEditBanner;
