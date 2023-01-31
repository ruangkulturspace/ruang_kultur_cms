import Head from "next/head";
import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";

import { Button, Row, Col, notification, Table } from "antd";
import { handleSessions } from "../../utils/helpers";
import { requestGet } from "../../utils/baseService";

const OverviewPage = ({ session }) => {
    const [state, dispatch] = useAppState();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        position: ["none", "bottomCenter"],
    });

    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        return () => { };
    }, [state]);

    const handleTableChangeTable1 = (paginationA, filtersA, sorterA) => {
      const pager = { ...pagination };
      pager.current = paginationA.current;
      setPagination(pager);
      fetchData(paginationA.current, paginationA.pageSize );
    };

    const fetchData = async (
      page = pagination.current,
      limit = pagination.pageSize,
      isExport = false
    ) => {
        setLoading(true);
        var params = {};

        if (!isExport) {
          params.page = page;
          params.perPage = limit;
        }

        const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/admin/user/list",
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
                            render={(value, item, index) => item?.firstName + " " + item.lastName ?? "-"}
                        />
                        <Table.Column
                            title="User Name"
                            dataIndex="username"
                            render={(value, item, index) => value ?? "-"}
                        />
                        <Table.Column
                            title="Gender"
                            dataIndex="gender"
                            render={(value, item, index) => value ?? "-"}
                        />
                        <Table.Column
                            title="Email"
                            dataIndex="email"
                            render={(value, item, index) => value ?? "-"}
                        />
                        <Table.Column
                            title="Phone Number"
                            dataIndex="mobileNumber"
                            render={(value, item, index) => value ?? "-"}
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

export default OverviewPage;
