import Head from "next/head";
import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";

import { Button, Row, Col, notification, Table, Input, Tooltip } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet } from "../../utils/baseService";
import ModalAddCategory from "../../components/Category/ModalAddCategory";
import ModalViewCategory from "../../components/Category/ModalViewCategory";
import ModalDeleteCategory from "../../components/Category/ModalDeleteCategory";
import ModalEditCategory from "../../components/Category/ModalEditCategory";

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
              {/* <Col xs={12} sm={12} md={12} lg={6}>
                  <Tooltip placement="top" title={"Detail User"}>
                      <img
                          onClick={() => {
                              onView(id, allData);
                          }}
                          className="pointer"
                          src="/images/icon/login/eye.svg"
                          alt="edit"
                      />
                  </Tooltip>
              </Col> */}
              <Col xs={12} sm={12} md={12} lg={6}>
                  <Tooltip placement="top" title={"Edit User"}>
                      <img
                          onClick={() => {
                              onEdit(id, allData);
                          }}
                          className="pointer"
                          src="/images/icon/prtg/edit.svg"
                          alt="edit"
                      />
                  </Tooltip>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                  <Tooltip placement="top" title={"Delete User"}>
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

const Category = ({ session }) => {
    const [state, dispatch] = useAppState();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0,
        position: ["none", "bottomCenter"],
    });

    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [filtering, setFiltering] = useState('');
    const [sortering, setSorter] = useState({});

    const [modalAdd, setModalAdd] = useState(false);

    const [modalView, setModalView] = useState(false);
    const [dataView, setDataView] = useState({});

    const [modalDelete, setModalDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [modalEdit, setModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    useEffect(() => {
        fetchData();
        return () => { };
    }, [state]);

    const handleTableChangeTable1 = (paginationA, filtersA, sorterA) => {
      const pager = { ...pagination };
      pager.current = paginationA.current;
      setPagination(pager);
      fetchData({ page: paginationA.current, limit: paginationA.pageSize, filters: filtersA, sorter: sorterA });
    };

    const fetchData = async (
      page = pagination.current,
      limit = pagination.pageSize,
      isExport = false,
      filters = filtering,
      sorter = sortering
    ) => {
        setLoading(true);
        var params = {};

        if (!isExport) {
          params.page = page;
          params.limit = limit;
        }

        if (searchWord != '') {
            params.search = searchWord;
        }

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/category/list",
          {
            params: params,
          }
        );
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
            <ModalAddCategory
                modalAdd={modalAdd}
                setModalAdd={setModalAdd}
                session={session}
                onFinish={() => {
                    fetchData({
                        page: 1, limit: pagination.pageSize,
                        filters: filtering, sorter: sortering
                    });
                }}
            />

            {/* <ModalViewCategory
                modalView={modalView}
                setModalView={setModalView}
                dataView={dataView}
            /> */}

            <ModalEditCategory
                modalEdit={modalEdit}
                setModalEdit={setModalEdit}
                dataEdit={dataEdit}
                session={session}
                onFinish={() => {
                  fetchData({
                        page: 1, limit: pagination.pageSize,
                        filters: filtering, sorter: sortering
                    });
                }}
            />

            <ModalDeleteCategory
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
                        Search
                    </h1>
                </Col>
            </Row>

            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={6}>
                    <Input
                        style={{ borderRadius: '4px', width: '100%', float: 'right' }}
                        placeholder="name, username, email, no telpon"
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
                            {!state.mobile && <Col xs={24} sm={24} md={24} lg={10}></Col>}

                            <Col xs={24} sm={24} md={24} lg={14}>
                                <Button
                                    onClick={() => {
                                        setModalAdd(!modalAdd);
                                    }}
                                    className="btn btnBlue"
                                    style={{ borderRadius: "4px" }}
                                >
                                    <p style={{ margin: '0' }}>Tambah Kategori </p>
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
                            title="Nama"
                            dataIndex="name"
                            render={(value, item, index) => value ?? "-"}
                        />
                        <Table.Column
                            title="Deskripsi"
                            dataIndex="description"
                            render={(value, item, index) => {
                              return (
                                <>
                                  <Input.TextArea
                                    readOnly
                                    value={value}
                                    style={{ borderRadius: '10px' }}
                                  />
                                </>
                              );
                            }}
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
                                      // onView={(id, allData) => {
                                      //     setDataView(allData);
                                      //     setModalView(true);
                                      // }}
                                      onEdit={(id, allData) => {
                                          setDataEdit(allData);
                                          setModalEdit(true);
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

export default Category;
