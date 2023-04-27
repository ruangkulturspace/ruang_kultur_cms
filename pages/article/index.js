import Head from "next/head";
import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button, Row, Col, notification, Table, Input, Tooltip, Form, Switch, DatePicker, Divider } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestDownloadWithPost, requestGet, requestPatch, requestPost, showSuksesCustom } from "../../utils/baseService";
// import ModalViewArticle from "../../components/Article/ModalViewArticle";
import ModalDeleteArticle from "../../components/Article/ModalDeleteArticle";
import Link from "next/link";
import { DisableDateMonth, PushNavigateTo } from "../../utils/helpersBrowser";

const UsersAction = ({
  session,
  id,
  allData,
  onEdit = () => { },
  onDelete = () => { },
  onView = () => { },
}) => {
  return (
      <>
          <Row gutter={[8, 8]} type="flex" align="middle" justify="start">
              <Col xs={24} sm={24} md={24} lg={8}>
                  <Tooltip placement="top" title={"Detail Article"}>
                      <img
                          onClick={() => {
                              PushNavigateTo(`/article-detail?id=${id}`)
                          }}
                          className="pointer"
                          src="/images/icon/login/eye.svg"
                          alt="edit"
                      />
                  </Tooltip>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                  <Tooltip placement="top" title={"Edit"}>
                      <img
                          onClick={() => {
                              PushNavigateTo(`/article-form-update?id=${id}`)
                          }}
                          // onClick={() => {
                          //     onEdit(id, allData);
                          // }}
                          className="pointer"
                          src="/images/icon/prtg/edit.svg"
                          alt="edit"
                      />
                  </Tooltip>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                  <Tooltip placement="top" title={"Delete"}>
                      <img
                          onClick={() => {
                              onDelete(id, allData);
                          }}
                          className="pointer"
                          src="/images/icon/prtg/delete.svg"
                          alt="delete"
                      />
                  </Tooltip>
              </Col>
          </Row>
      </>
  );
};

const Article = ({ session }) => {
    const [state, dispatch] = useAppState();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 1,
        position: ["none", "bottomCenter"],
    });

    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [filtering, setFiltering] = useState('');
    const [sortering, setSorter] = useState({});
    const [periode, setPeriode] = useState([])

    const [modalDelete, setModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchData({
          page: pagination.current,
          limit: pagination.pageSize
        });
    }, []);

    const [formIsActive] = Form.useForm();

    const submitForm = async (values) => {
        setLoading(true);

        const swtich = values.isActive === false ? "inactive" : "active"

        const data = await requestPatch(
            session,
            process.env.NEXT_PUBLIC_API_URL + `/api/v1/admin/article/update/${values.id}/${swtich}`,
            {}
        );

        setLoading(false);
        if (data?.data?.statusCode == 200) {
            showSuksesCustom("Berhasil", "Data berhasil di update");
            fetchData({ page: pagination.current, limit: pagination.pageSize });
        }
    }

    const handleTableChangeTable1 = (paginationA, filtersA, sorterA) => {
      const pager = { ...pagination };
      pager.current = paginationA.current;
      setPagination(pager);
      fetchData({ page: paginationA.current, limit: paginationA.pageSize, filters: filtersA, sorter: sorterA });
    };

    const fetchData = async ({
      page = pagination.current,
      limit = pagination.pageSize,
      isExport = false,
      filters = filtering,
      range = [],
      sorter = sortering,
    }) => {
        setLoading(true);
        var params = {};

        if (!isExport) {
          params.page = page;
          params.perPage = limit;
        }

        if (searchWord != '') {
          params.search = searchWord;
        }

        if (range) {
          if (range?.[0]) {
            params.startDate = range[0].toISOString();
          }
          if (range?.[1]) {
            params.endDate = range[1].toISOString();
          }
        }

        const datar = !isExport
          ? await requestGet(
            session,
            process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/article/list",
            {
              params: params,
            }
          )
          : await requestDownloadWithPost(
            session,
            process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/article/export",
            params,
            {},
            range[0] ? `Article_List_Export_${range[0].format("YYYY-MM-DD")}_${range[1].format("YYYY-MM-DD")}.xlsx` : "Article_List_Export.xlsx"
          )
        setLoading(false);

        if (datar?.data?.statusCode == 200) {
          if (!isExport) {
            setPageData(datar?.data?.data ?? []);
            setPagination({
              current: datar?.data?.currentPage ?? 1,
              pageSize: datar?.data?.perPage,
              total: datar?.data?.totalData ?? 0,
              position: ["none", "bottomCenter"],
            });
          } else {
            return datar?.data?.data ?? [];
          }
        }
    }

    return (
        <>
            <ModalDeleteArticle
                modalDelete={modalDelete}
                setModalDelete={setModalDelete}
                dataDelete={dataDelete}
                session={session}
                onFinish={() => {
                    fetchData({
                        page: 1, limit: pagination.pageSize,
                        filters: filtering, sorter: sortering
                    });
                }}
            />

            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <h1 style={{ fontSize: '12px' }} className="headerPage">
                  Date Range
                </h1>
              </Col>
            </Row>
            <Row gutter={[10, 10]} justify="space-between">
              <Col xs={24} sm={24} md={24} lg={6}>
                <DatePicker.RangePicker
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                  }}
                  suffixIcon={
                    <Row align="middle">
                      <img alt="dropdown" src="/images/icon/arrow-down-blue.svg" />
                    </Row>
                  }
                  disabled={loading}
                  // placeholder="Cari Bulan & Tahun"
                  disabledDate={DisableDateMonth}
                  onChange={(value, vstring) => {
                    fetchData({
                      page: 1,
                      limit: pagination.pageSize,
                      range: value
                    });
                    setPeriode(value);
                    // onChange(filter, value);
                  }}
                />
              </Col>
            </Row>

            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <h1 style={{ fontSize: '12px' }} className="mt-2 headerPage">
                        Search
                    </h1>
                </Col>
            </Row>

            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={6}>
                    <Input
                        style={{ borderRadius: '4px', width: '100%', float: 'right' }}
                        placeholder="Search by name"
                        allowClear
                        enterButton="Search"
                        size="medium"
                        suffix={
                            <>
                                {' '}
                                <img src="/images/icon/search.svg" alt="icon-search" />{' '}
                            </>
                        }
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                fetchData({ page: 1, limit: pagination.pageSize, filters: filtering, sorter: sortering });
                            }
                        }}
                        onChange={(e) => setSearchWord(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={4} md={4} lg={4}>
                    <Button
                        disabled={false}
                        style={{
                            borderRadius: '4px',
                            color: '#fff',
                            boxShadow: '0px 2px 5px rgba(51, 83, 158, 0.2)',
                            width: '100%',
                        }}
                        onClick={() => {
                            fetchData({ page: 1, limit: pagination.pageSize, filters: filtering, sorter: sortering });
                        }}
                        className="btn btnBlue"
                    >
                        Search
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24 - 5 - 4 - 6}></Col>
                <Col xs={24} sm={24} md={24} lg={5}>
                    <div
                        style={{ float: 'right', width: state.mobile ? 'auto' : '340px' }}
                    >
                        <Row gutter={[10, 10]}>
                            {!state.mobile && <Col xs={24} sm={24} md={24} lg={2}></Col>}

                            <Col xs={24} sm={24} md={24} lg={10}>
                                <Button
                                    className="btn btnBlue"
                                    style={{ borderRadius: "4px" }}
                                >
                                    <Link href="/article-form">
                                      Tambah Article
                                    </Link>
                                </Button>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={10}>
                              <Button
                                loading={loading}
                                style={{
                                  borderRadius: "4px",
                                  color: "#33539E",
                                  boxShadow: "0px 2px 5px rgba(51, 83, 158, 0.2)",
                                  width: "100%",
                                }}
                                className="btn"
                                onClick={() => {
                                  fetchData({
                                    page: pagination.current,
                                    limit: pagination.pageSize,
                                    filters: filtering,
                                    sorter: sortering,
                                    isExport: true,
                                    range: periode
                                  });
                                }}
                              >
                                Export
                              </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row className="my-4">
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Table
                        dataSource={pageData}
                        rowKey={(_, index) => index}
                        loading={loading}
                        scroll={{ x: "100%" }}
                        onChange={handleTableChangeTable1}
                        pagination={pagination}
                        footer={() => (
                            <div className="footer-text">
                                {pagination.current * pagination.pageSize > pagination.total
                                    ? `Showing ${pagination.total} of ${pagination.total} entries`
                                    : `Showing ${pagination.current * pagination.pageSize} of ${pagination.total
                                    } entries`}
                            </div>
                        )}
                    >
                        <Table.Column
                            title="No"
                            key="index"
                            width="5%"
                            render={(value, item, index) => (pagination.current - 1) * pagination.pageSize + index + 1}
                        />
                        <Table.Column
                            title="Post Date"
                            dataIndex="createdAt"
                            render={(value, item, index) => moment(value).format("DD-MMM-YYYY") ?? "-"}
                        />
                        <Table.Column
                            title="Article Title"
                            dataIndex="title"
                            render={(value, item, index) => value ?? "-"}
                        />
                        <Table.Column
                            title="Kanal"
                            dataIndex="category"
                            render={(value, item, index) => value?.name ?? "-"}
                        />
                        {/* <Table.Column
                            title="Status"
                            dataIndex="isActive"
                            render={(value, item, index) => {
                              if (value === true) {
                                return (
                                  <p
                                    style={{
                                      margin: '0px',
                                      fontWeight: '600',
                                      fontSize: '14px',
                                      color: '#03C4A9',
                                    }}
                                  >
                                    Active
                                  </p>
                                )
                              }
                              if (value === false) {
                                return (
                                  <p
                                    style={{
                                      margin: '0px',
                                      fontWeight: '600',
                                      fontSize: '14px',
                                      color: '#D05C77',
                                    }}
                                  >
                                    In Active
                                  </p>
                                )
                              }
                              return '-'
                            }}
                        /> */}
                        <Table.Column
                            title="Status"
                            dataIndex="_id"
                            render={(id, item, index) => (
                              <>
                                <Form layout="vertical" form={formIsActive} className="formDaftar">
                                  <Form.Item
                                      name="id"
                                      style={{display: "none"}}
                                  >
                                    <Input defaultValue={id}/>
                                  </Form.Item>
                                  <Form.Item
                                      name="isActive"
                                      style={{ marginBottom: '12px' }}
                                  >
                                      <Switch
                                        onChange={(value) => {
                                            formIsActive.setFieldsValue({
                                                isActive: value,
                                                id: id
                                            })
                                        }}
                                        onClick={() => {
                                            formIsActive.validateFields().then(values => {
                                              submitForm(values);
                                            });
                                        }}
                                        checked={item.isActive === true ? true : false}
                                      />
                                  </Form.Item>
                                </Form>
                              </>
                          )}
                        />
                        <Table.Column
                          title="Actions"
                          dataIndex="_id"
                          width="10%"
                          render={(id, item, index) => (
                              <>
                                  <UsersAction
                                      key={index}
                                      id={id}
                                      session={session}
                                      allData={item}
                                      onView={(id) => {
                                          PushNavigateTo(`/article-detail?id=${id}`)
                                      }}
                                      onEdit={(id, allData) => {
                                          PushNavigateTo(`/article-form-update?id=${id}`)
                                          // setDataEdit(allData);
                                          // setModalEdit(true);
                                      }}
                                      onDelete={(id, allData) => {
                                          setDataDelete(allData);
                                          setModalDelete(true);
                                      }}
                                  />
                              </>
                          )}
                      />
                    </Table>
                </Col>
            </Row>
        </>
    );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Article;
