import Head from "next/head";
import { useAppState } from "../../components/shared/AppProvider";
import { useEffect, useState } from "react";

import { Button, Row, Col, notification, Table } from "antd";
import { getRandomUser } from "../../utils/services/getRandomUser";
import withAuth from "../../utils/withAuth";
import { showError } from "../../utils/helpersBrowser";

const OverviewPage = ({ auth }) => {
    // console.log(session)
    const [state, dispatch] = useAppState();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [pagination2, setPagination2] = useState({
        current: 1,
        pageSize: 10,
    });
    const [pageData, setPageData] = useState([]);
    const [pageData2, setPageData2] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [activeTab, setActiveTab] = useState(1);

    const fetchData = async (data = pagination) => {
        setLoading(true);
        getRandomUser(data)
            .then((e) => {
                console.log(e);
                setPagination({ ...data, total: 200 });
                setPageData(e.results);
            })
            .catch((e) => showError(e.status, e.message))
            .finally(() => {
                setLoading(false);
            });

    }
    const fetchData2 = async (data = pagination) => {
        setLoading2(true);
        getRandomUser(data)
            .then((e) => {
                console.log(e);
                setPagination2({ ...data, total: 200 });
                setPageData2(e.results);
            })
            .catch((e) => showError(e.status, e.message))
            .finally(() => {
                setLoading2(false);
            });

    }

    useEffect(() => {
        // dispatch({ type: "showLoading" });
        fetchData();
        fetchData2();
    }, []);

    const handleTableChangeTable1 = async (pagination) => {
        setPagination(pagination);
        // dispatch({ type: "showLoading" });
        await fetchData(pagination);
    };
    const handleTableChangeTable2 = async (pagination) => {
        setPagination2(pagination);
        // dispatch({ type: "showLoading" });
        await fetchData2(pagination);
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/react-vis.css" />
                <link rel="stylesheet" href="/css/table.css" />
                <link rel="stylesheet" href="/app.css" />

            </Head>
            <div className={!state.mobile ? "tabular-border-bottom" : ""}>

                <Row gutter={[10, 10]}>
                    <Col
                        className={state.mobile ? "tabular-border-bottom" : ""}
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                    >
                        <div className="tabular-w">
                            <Row>
                                <div
                                    onClick={() => {
                                        setActiveTab(1);
                                    }}
                                    className={"tabular-i " + (activeTab == 1 ? "active" : "")}
                                >
                                    <h1 className="headerPageTabular">Users</h1>
                                </div>
                                <div
                                    onClick={() => {
                                        setActiveTab(2);
                                    }}
                                    className={"tabular-i " + (activeTab == 2 ? "active" : "")}
                                >
                                    <h1 className="headerPageTabular">Users 2</h1>
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
            {
                activeTab == 1 && (
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
                                        render={(value, item, index) => value?.first ?? "-"}
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
                                </Table>
                            </Col>
                        </Row>
                    </>
                )
            }
            {
                activeTab == 2 && (
                    <>
                        <Row className="my-4">
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <Table
                                    dataSource={pageData2}
                                    rowKey={(_, index) => index}
                                    loading={loading2}
                                    scroll={{ x: "100%" }}
                                    onChange={handleTableChangeTable2}
                                    pagination={pagination2}
                                    footer={() => (
                                        <div className="footer-text">
                                            {pagination2.current * pagination2.pageSize > pagination2.total
                                                ? `Showing ${pagination2.total} of ${pagination2.total} entries`
                                                : `Showing ${pagination2.current * pagination2.pageSize} of ${pagination2.total
                                                } entries`}
                                        </div>
                                    )}
                                >
                                    <Table.Column
                                        title="No"
                                        key="index"
                                        width="5%"
                                        render={(value, item, index) => (pagination2.current - 1) * pagination2.pageSize + index + 1}
                                    />
                                    <Table.Column
                                        title="Nama"
                                        dataIndex="name"
                                        render={(value, item, index) => value?.first ?? "-"}
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
                                </Table>
                            </Col>
                        </Row>
                    </>
                )
            }
        </>
    );
};

export const getServerSideProps = withAuth(async ({ auth }) => {
    return {
        props: { auth },
    };
});

export default OverviewPage;