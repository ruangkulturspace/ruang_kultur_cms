import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button, Input, Form, Card, Select, DatePicker, Checkbox, Radio, Upload, Spin, Row, message } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet, requestPostFormData, showSuksesCustom } from "../../utils/baseService";
import { ReloadOutlined, SaveFilled, UploadOutlined } from "@ant-design/icons";
import { PushNavigateTo } from "../../utils/helpersBrowser";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/WSIWYG"), {
  ssr: false,
});

const ArticleForm = ({ session }) => {
    const { Option } = Select;
    const [state, dispatch] = useAppState();
    const [loading, setLoading] = useState(false);

    const [formArticle] = Form.useForm();

    const [dataType, setDataType] = useState()
    const [dataCategory, setDataCategory] = useState()
    const [type, setType] = useState()
    const [active, setActive] = useState()
    const [isOnLandingPage, setIsOnLandingPage] = useState()
    const [category, setCategory] = useState()
    const [content, setContent] = useState()

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

    const submitForm = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title ?? "-");
        formData.append('type', values.type ?? "-");
        formData.append('category', values.category ?? "-");
        formData.append('editor', values.editor ?? "-");
        formData.append('reporter', values.reporter ?? "-");
        formData.append('isActive', active);
        formData.append('isOnLandingPage', false);
        formData.append('content', content);

        let formatted1 = moment(values.date)

        formData.append('date', formatted1);

        if (fileList.length > 0) {
            fileList.forEach((file) => {
                formData.append('image', file);
            });
        }

        setLoading(true);
        var datar = await requestPostFormData(session, process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/article/create", formData);
        setLoading(false)
        if (datar?.data?.statusCode == 201) {
          showSuksesCustom("Success!", datar?.message);
          // resetAll();
          PushNavigateTo("/article");
        }
    }

    return (
      <div className="p-6 rounded-lg bgW">
        <div className="items-center justify-between w-full">
          <h1 className="text-3xl font-bold">Tambah Article</h1>
          <hr className="mb-3" />
          <Spin tip="Memuat..." size="large" spinning={state.loading || loading}>
            <Form layout="vertical" form={formArticle}>
              <div className="flex flex-col flex-wrap md:flex-row">
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
                  <Form.Item
                      name="dokumen"
                      label="Image"
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
                </div>

                <div className="w-full pr-0 lg:pr-1">
                  <Row>
                    <div className="w-1/2 px-0">
                      <Form.Item
                        name="isActive"
                        label="Active"
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
                    </div>

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
              >
                {/* WYSWYG here */}
                <div className="rounded-lg bgW">
                  <Editor
                    // raw={rawTextTambahArticle}
                    caller="tambahArticle"
                    onChangeRaw={(value)=>{
                      setContent(value)
                    }}
                  />
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
                    formArticle.validateFields().then((values) => {
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
                    formArticle.resetFields();
                    setFileList([]);
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Spin>
        </div>
      </div>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default ArticleForm;
