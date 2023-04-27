import Head from "next/head";
import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button, Row, Col, notification, Table, Input, Tooltip, DatePicker } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestDownloadWithPost, requestGet } from "../../utils/baseService";
import Link from "next/link";
import { DisableDateMonth } from "../../utils/helpersBrowser";
// import ModalDeletePageView from "../../components/PageView/ModalDeletePageView";

const UsersAction = ({
  session,
  id,
  allData,
  onDelete = () => { },
}) => {
  return (
      <>
          <Row gutter={[8, 8]} type="flex" align="middle" justify="start">
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

const BannerReport = ({ session }) => {
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
        fetchData({ page: pagination.current, limit: pagination.pageSize });
    }, []);

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
      sorter = sortering
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

        // console.log("asd", sorter);

        if (sorter?.field == "counter") {
          if (sorter.order == "descend") {
            params.sort = "totalCounter@asc";
          } else {
            params.sort = "totalCounter@desc";
          }
        }
        if (sorter?.field == "createdAt") {
          if (sorter.order == "descend") {
            params.sort = "createdAt@asc";
          } else {
            params.sort = "createdAt@desc";
          }
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
            process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/banner/list",
            {
              params: params,
            }
          )
          : await requestDownloadWithPost(
            session,
            process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/banner/export",
            params,
            {},
            range[0] ? `Banner_Report_${range[0].format("YYYY-MM-DD")}_${range[1].format("YYYY-MM-DD")}.xlsx` : "Banner_Report.xlsx"
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
            {/* <ModalDeletePageView
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
            /> */}

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
                    <h1 style={{ fontSize: '12px' }} className="headerPage">
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
                            {!state.mobile && <Col xs={24} sm={24} md={24} lg={10}></Col>}

                            {/* <Col xs={24} sm={24} md={24} lg={14}>

                            </Col> */}
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
                            dataIndex="startDate"
                            render={(value, item, index) => moment(value).format("DD-MMM-YYYY") ?? "-"}
                        />
                        <Table.Column
                            title="End Date"
                            dataIndex="endDate"
                            render={(value, item, index) => moment(value).format("DD-MMM-YYYY") ?? "-"}
                        />
                        <Table.Column
                            title="Banner Owner"
                            dataIndex="owner"
                            render={(value, item, index) => value ?? "-"}
                        />
                        <Table.Column
                            title="Tipe"
                            dataIndex="type"
                            render={(value, item, index) => value?.name ?? "-"}
                        />
                        <Table.Column
                            title="Total Impression"
                            dataIndex="counter"
                            sorter={true}
                            render={(value, item, index) => value[0]?.view ?? 0}
                        />
                        <Table.Column
                            title="Total Click"
                            dataIndex="counter"
                            sorter={true}
                            render={(value, item, index) => value[0]?.click ?? 0}
                        />
                        <Table.Column
                            title="Total CTR"
                            dataIndex="counter"
                            sorter={true}
                            render={(value, item, index) => {
                              if(value[0]?.totalCtr !== undefined){
                                return value[0]?.totalCtr + " %"
                              }else{
                                return "0 %"
                              }
                            }}
                        />
                        {/* <Table.Column
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
                                      onDelete={(id, allData) => {
                                          setDataDelete(allData);
                                          setModalDelete(true);
                                      }}
                                  />
                              </>
                          )}
                        /> */}
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

export default BannerReport;
