import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import moment from 'moment';
import CardClass from "../../components/Cards/CardClass";
import LandingPage from "../../components/Layouts/LandingPageLayout";

import { useAppState } from "../../components/shared/AppProvider";
import { requestGetWithoutSession } from "../../utils/baseService";
import { Pagination, Row, Spin } from "antd";

const Kanal = ({}) => {
  const router = useRouter()
  const { type } = router.query
  const [state, dispatch] = useAppState();

  const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
      position: ["none", "bottomCenter"],
  });

  const [pageData, setPageData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async ({
    page = pagination.current,
    limit = pagination.pageSize,
    isExport = false,
    idType = type
  }) => {
      setLoading(true);
      var params = {};

      if (!isExport) {
        params.page = page;
        params.perPage = limit;
        params.category = idType;
      }

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
        {
          params: params,
        }
      );

      setLoading(false);

      if (datar?.data?.statusCode == 200) {
        setPageData(datar?.data?.data ?? []);
        setPagination({
          current: datar?.data?.currentPage ?? 1,
          pageSize: datar?.data?.perPage,
          total: datar?.data?.totalData ?? 0,
          position: ["none", "bottomCenter"],
        });
      }
  }
  console.log("asd2", pagination);

  useEffect(() => {
    fetchData({ page: pagination.current, limit: pagination.pageSize, category: type });
  }, [type]);

  const handleChangeTable1 = (paginationA, filtersA, sorterA) => {
    const pager = { ...pagination };
    pager.current = paginationA;
    setPagination(pager);
    fetchData({ page: paginationA, limit: pagination.pageSize, category: type});
  };

  return (
    <>
      <LandingPage title="Kanal">
        <div className="flex flex-col p-10 font-semibold bgW md:p-20">
          <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
            <div className="flex flex-col justify-between">
              <p className="my-0 text-3xl font-bold">{type}</p>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {(pageData.length !== 0) ? (
                <>
                  <div className="grid gap-10 mb-11 grid-rows md:grid-cols-2 lg:grid-cols-3">
                    {pageData?.map((e, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full cursor-pointer hovered-card hover:drop-shadow-lg"
                          onClick={() =>
                            router.push(
                              {
                                pathname: `/kanal-detail?id=${e._id}`,
                                query: e,
                              },
                              `/kanal-detail?id=${e._id}`
                            )
                          }
                        >
                          <CardClass
                            width="full"
                            title={e?.title}
                            category={e?.category?.name}
                            date={moment(e?.date).format("DD-MMMM-YYYY")}
                            imageName={e?.image?.completedUrl}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <center>
                    <Pagination
                      defaultCurrent={pagination.current}
                      defaultPageSize={pagination.pageSize} //default size of page
                      onChange={handleChangeTable1}
                      total={pagination.total} //total number of card data available
                    />
                  </center>
                </>
              ):(
                <Row gutter={[10, 10]} align="middle" justify="center">
                  <span
                    style={{
                        color: '#FA4547',
                        background: 'rgba(250, 69, 71, 0.2)',
                        padding: '3px 10px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        fontWeight: 'bold'
                    }}
                  >
                    No Data
                  </span>
                </Row>
              )}
            </>
          )}
        </div>
      </LandingPage>
    </>
  );
};

export default Kanal;
