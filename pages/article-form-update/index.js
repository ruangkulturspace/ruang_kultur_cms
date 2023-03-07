import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button, Input, Form, Card, Select, DatePicker, Checkbox, Radio, Upload, Spin, Row, message, Col, Image } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet, requestPostFormData, requestPut, showSuksesCustom } from "../../utils/baseService";
import { ReloadOutlined, SaveFilled } from "@ant-design/icons";
import { PushNavigateTo } from "../../utils/helpersBrowser";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ModalUpdateImage from "../../components/Article/ModalUpdateImage";
import TextArea from "antd/lib/input/TextArea";

const Editor = dynamic(() => import("../../components/WSIWYG"), {
  ssr: false,
});

const ArticleFormUpdate = ({ session }) => {
    const { Option } = Select;
    const router = useRouter()
    const { id } = router.query
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [formArticleUpdate] = Form.useForm();

    const [dataType, setDataType] = useState()
    const [dataCategory, setDataCategory] = useState()
    const [type, setType] = useState()
    const [isOnLandingPage, setIsOnLandingPage] = useState()
    const [category, setCategory] = useState()
    const [content, setContent] = useState()
    const [dataUpdate, setDataUpdate] = useState({})
    const [modalAdd, setModalAdd] = useState(false);

    const fetchDataDetailArticle = async (idArticle) => {
        setLoading(true);

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/article/get/${idArticle}`,
        );
        setLoading(false);
        if (datar?.data?.statusCode == 200 ?? false) {
          setDataUpdate(datar?.data?.data);
        }
    }

    const fetchDataType = async () => {
        setLoading(true);
        var params = {};

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/type/list",
          {
            params: params,
          }
        );
        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setDataType(datar?.data?.data ?? []);
        }
    }

    const fetchDataCategory = async () => {
        setLoading(true);
        var params = {};

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/category/list",
          {
            params: params,
          }
        );
        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          setDataCategory(datar?.data?.data ?? []);
        }
    }

    useEffect(() => {
        fetchDataType();
        fetchDataCategory();
        return () => { };
    }, [state]);

    useEffect(() => {
        if (id) {
          fetchDataDetailArticle(id);
        }
    }, [id])

    useEffect(() => {
        formArticleUpdate.setFieldsValue({
            title: dataUpdate?.title,
            metaData: dataUpdate?.metaData,
            type: dataUpdate?.type?._id,
            category: dataUpdate?.category?._id,
            editor: dataUpdate?.editor,
            reporter: dataUpdate?.reporter,
            isOnLandingPage: dataUpdate?.isOnLandingPage,
            date: moment(dataUpdate?.date),
        });
        setContent(dataUpdate?.content)
    }, [dataUpdate])
    // console.log("asd", dataUpdate);

    const submitForm = async (values) => {
        formArticleUpdate.validateFields().then(async values => {
            setLoading(true);
            const param = {
                title: values?.title,
                type: values?.type,
                metaData: values?.metaData,
                category: category ?? values?.category,
                editor: values?.editor,
                reporter: values?.reporter,
                // isOnLandingPage: values?.isOnLandingPage,
                content: content,
                date: moment(values.date)
            };

            var datar = await requestPut(
                session,
                process.env.NEXT_PUBLIC_API_URL + '/api/v1/admin/article/update/' + dataUpdate._id,
                param
            );
            setLoading(false);

            if (datar?.data?.statusCode < 400) {
                showSuksesCustom("Success!", datar?.message);
                PushNavigateTo("/article");
            }
        });
    }

    return (
      <>
        <ModalUpdateImage
          modalAdd={modalAdd}
          setModalAdd={setModalAdd}
          session={session}
          articleId={dataUpdate._id}
          onFinish={() => {
            fetchDataDetailArticle(dataUpdate._id);
          }}
        />

        <div className="p-6 rounded-lg bgW">
          <div className="items-center justify-between w-full">
            <h1 className="text-3xl font-bold">Edit Article</h1>
            <hr className="mb-3" />
            <Spin tip="Memuat..." size="large" spinning={state.loading || loading}>
              <Form layout="vertical" form={formArticleUpdate}>
                <div className="flex flex-col flex-wrap md:flex-row">
                  <Col span={18} className="pb-2 pr-3">
                    <div className="w-full px-0">
                      <Form.Item
                        name="type"
                        label="Type"
                        rules={[
                            { required: true, message: 'Harap Lengkapi Data!' },
                        ]}
                      >
                        <Radio.Group
                            onChange={(e) => {
                                setType(e.target.value)
                            }}
                            value={type}
                        >
                          {dataType?.map((k,v) => {
                            return <Radio key={v} value={k._id}>{k.name}</Radio>
                          })}
                        </Radio.Group>
                      </Form.Item>
                    </div>
                    <div className="w-full px-0">
                      <Form.Item
                        name="category"
                        label="Kanal"
                        rules={[
                            { required: true, message: 'Harap Lengkapi Data!' },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Pilih Kanal"
                          optionFilterProp="children"
                          onChange={(value, option) => {
                              setCategory(value, option)
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {dataCategory?.map((k,v) => {
                            return <Option key={v} value={k._id}>{k.name}</Option>
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="w-full px-0">
                      <Form.Item
                        name="title"
                        label="Judul"
                        rules={[
                            { required: true, message: 'Harap Lengkapi Data!' },
                        ]}
                      >
                        <Input
                          placeholder="Masukkan Judul"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col span={12}>
                            <p>Main image :</p>
                          </Col>
                          <Col span={12}>
                            <Button
                              onClick={() => {
                                setModalAdd(!modalAdd);
                              }}
                              className="mb-1 ml-2 btn btnBlue"
                              style={{ borderRadius: "4px" }}
                            >
                              <p style={{ margin: '0' }}>
                                Update gambar
                              </p>
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Image
                          // width={200}
                          alt={dataUpdate?.image?.pathWithFilename}
                          src={dataUpdate?.image?.completedUrl}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div className="flex flex-col flex-wrap md:flex-row">
                  <div className="w-full px-0">
                    <Form.Item
                      name="metaData"
                      label="Meta Data"
                      rules={[
                          { required: true, message: 'Harap Lengkapi Data!' },
                      ]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                  </div>
                  <div className="w-full px-0">
                    <Form.Item
                      name="reporter"
                      label="Reporter"
                      rules={[
                          { required: true, message: 'Harap Lengkapi Data!' },
                      ]}
                    >
                      <Input
                        placeholder="Masukkan Nama Reporter"
                      />
                    </Form.Item>
                  </div>

                  <div className="w-full px-0">
                    <Form.Item
                      name="editor"
                      label="Editor"
                      rules={[
                          { required: true, message: 'Harap Lengkapi Data!' },
                      ]}
                    >
                      <Input
                        placeholder="Masukkan Nama Editor"
                      />
                    </Form.Item>
                  </div>

                  <div className="w-full pr-0 lg:pr-1">
                    <Form.Item
                      name="date"
                      label="Mulai"
                      rules={[
                          { required: true, message: 'Harap Lengkapi Data!' },
                      ]}
                    >
                      <DatePicker
                        style={{
                          width: "100%",
                        }}
                      />
                    </Form.Item>
                  </div>

                  <div className="w-full pr-0 lg:pr-1">
                    <Row>
                      <div className="w-1/2 px-0">
                        {/* <Form.Item
                          name="isOnLandingPage"
                          label="Onlanding Page"
                          rules={[
                              { required: true, message: 'Harap Lengkapi Data!' },
                          ]}
                        >
                          <Radio.Group
                              onChange={(e) => {
                                setIsOnLandingPage(e.target.value)
                              }}
                              options={[
                                  { label: 'Yes', value: true },
                                  { label: 'No', value: false }
                              ]}
                              value={isOnLandingPage}
                          />
                        </Form.Item> */}
                      </div>
                    </Row>
                  </div>
                </div>

                <Form.Item
                  label="Content"
                  name="content"
                >
                  {/* WYSWYG here */}
                  <div className="rounded-lg bgW">
                    {content ? (
                      <>
                        <Editor
                          raw={content}
                          caller="tambahArticle"
                          onChangeRaw={(value)=>{
                            setContent(value)
                          }}
                        />
                      </>
                    ):(
                      <>
                        <>
                          <Editor
                            // raw={content}
                            caller="tambahArticle"
                            onChangeRaw={(value)=>{
                              setContent(value)
                            }}
                          />
                        </>
                      </>
                    )}
                  </div>
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button
                    style={{
                      backgroundColor: '#0db8a1',
                      color: 'white',
                      width: '10%',
                      marginRight: '10px',
                    }}
                    onClick={() => {
                      formArticleUpdate.validateFields().then((values) => {
                        submitForm(values);
                      });
                    }}
                    icon={<SaveFilled style={{ marginTop: '-3px' }} />}
                  >
                    Submit
                  </Button>
                  <Button
                    style={{
                      backgroundColor: '#de0910',
                      color: 'white',
                      width: '10%',
                    }}
                    icon={<ReloadOutlined style={{ marginTop: '-3px' }} />}
                    onClick={() => {
                      formArticleUpdate.resetFields();
                      // setFileList([]);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </Spin>
          </div>
        </div>
      </>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default ArticleFormUpdate;
