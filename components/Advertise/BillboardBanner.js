import React, { useState } from 'react'
import { requestPostWithoutSession } from '../../utils/baseService';

export default function BillboardBanner({data, key}) {
  const [displayBillboard, setDisplayBillboard] = useState(true);
  const [loadingCount, setLoadingCount] = useState(false);

  const closeButtonBillboard = () => {setDisplayBillboard(false)}

  const handleClickCount = async (id) => {
    setLoadingCount(true);

    const param = {
      "banner": id,
      "tag": "click",
    };

    var counter = await requestPostWithoutSession(
      "",
      process.env.NEXT_PUBLIC_API_URL + '/api/v1/banner-counter/create',
      param
    )
    setLoadingCount(false);
    if (counter?.data?.statusCode < 400) {
      console.log("berhasil count");
    }
  }

  return (
    <>
      {displayBillboard === true && (
        <>
          <a
            href={data?.url}
            onClick={() => handleClickCount(data?._id)}
          >
            <div
              className="fixed top-0 left-0 right-0 z-50 w-full p-2 banner_top"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${data?.image?.completedUrl})`,
                height: "150px",
                width: "970px",
                top: "8%",
                left:"15%",
              }}
            >
            </div>
          </a>
          <div className="flex flex-row items-baseline justify-center h-full">
            <div
                className="fixed z-50 px-2 py-1 m-3 text-center cursor-pointer top-10"
                onClick={() => closeButtonBillboard()}
                style={{
                  right: "10%"
                }}
            >
                X
            </div>
          </div>
        </>
      )}
    </>
  )
}
