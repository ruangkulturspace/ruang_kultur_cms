import { ClockCircleOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import CardClass from "./CardClass";
import { useRouter } from "next/router";
import { requestGetWithoutSession, requestPostWithoutSession } from "../../utils/baseService";
import { useAppState } from "../shared/AppProvider";
import { Button, Spin } from "antd";

const CardLates = ({ }) => {
  const router = useRouter();
  const [state, dispatch] = useAppState();

  const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 6,
      total: 0,
      position: ["none", "bottomCenter"],
      totalPage: 0
  });

  const [pageData, setPageData] = useState([]);
  const [idData, setIdData] = useState([])
  const [sorter, setSorter] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);

  const fetchDataArticle = async ({
    page = pagination.current,
    limit = pagination.pageSize,
  }) => {
      setLoading(true);
      var params = {};

      params.page = page;
      params.perPage = limit;
      params.sort = "date@desc"
      params.isActive = "true"

      const datar = await requestGetWithoutSession(
        "",
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/article/list`,
        {
          params: params,
        }
      );

      setLoading(false);

      if (datar?.data?.statusCode == 200) {
        const listCard = []
        datar?.data?.data.forEach(element => {
          listCard.push(element);
        });
        setPageData((pageData) => [...pageData, ...listCard]);
        setIdData(datar?.data?.data?.map((k)=> k._id))

        setPagination({
          current: datar?.data?.currentPage ?? 1,
          pageSize: datar?.data?.perPage,
          total: datar?.data?.totalData ?? 0,
          position: ["none", "bottomCenter"],
          totalPage: datar?.data?.totalPage ?? 0
        });
      }
  }

  // const fetchCounterArticle = async (ids) => {
  //     setLoadingCount(true);
  //     const param = {
  //       "articleIds": ids,
  //       "tag": "view",
  //     };

  //     var counter = await requestPostWithoutSession(
  //       "",
  //       process.env.NEXT_PUBLIC_API_URL + '/api/v1/article-counter/bulk-create',
  //       param
  //     )
  //     setLoadingCount(false);
  //     if (counter?.data?.statusCode < 400) {
  //       console.log("berhasil count");
  //     }
  // }

  useEffect(() => {
      fetchDataArticle({ page: pagination.current, limit: pagination.pageSize});
  }, []);

  // useEffect(() => {
  //     fetchCounterArticle(idData)
  // }, [idData])

  const handleClickCount = async (id) => {
    setLoadingCount(true);
    const param = {
      "article": id,
      "tag": "click",
    };

    var counter = await requestPostWithoutSession(
      "",
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/article-counter/create',
      param
    )
    setLoadingCount(false);
    if (counter?.data?.statusCode < 400) {
      console.log("berhasil count");
    }
  }

  const handleChangeTable1 = () => {
    const pager = { ...pagination };
    pager.current = pagination.current + 1;
    setPagination(pager);
    fetchDataArticle({ page: pagination.current + 1, limit: pagination.pageSize});
  };

  return (
    <div className="flex flex-col p-10 font-semibold bgW md:p-28">
      <div className="flex flex-col items-start justify-between mb-5 md:flex-row md:items-center">
        <div className="flex flex-col justify-between">
          <p className="my-0 text-3xl font-bold">Lates</p>
        </div>
      </div>
      <div className="grid gap-10 mb-11 grid-rows md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {pageData?.map((e, index) => {
          return (
            <div
              key={index}
              className="w-full cursor-pointer hovered-card hover:drop-shadow-lg"
              onClick={() =>{
                router.push(
                  {
                    pathname: `/kanal-detail?id=${e?._id}`,
                    query: e,
                  },
                  `/kanal-detail?id=${e?._id}`
                )
                handleClickCount(e?._id)
              }}
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
        {pagination?.current === pagination?.totalPage ? (
          <></>
        ):(
          <>
            {loading && (
              <div className="flex flex-col items-center justify-center mb-3">
                <Spin size="large" />
              </div>
            )}

            <Button
                disabled={false}
                style={{
                    borderRadius: '4px',
                    boxShadow: '0px 2px 5px rgba(51, 83, 158, 0.2)',
                }}
                onClick={handleChangeTable1}
                className="btn btnLightCnBlue"
            >
                Load more data
            </Button>
          </>
        )}
      </center>
    </div>
  );
};

export default CardLates;
