import React, { useState } from 'react'
import { requestPostWithoutSession } from '../../utils/baseService';

export default function ExpandAble({data, key}) {
  const [displayExpandAble, setDisplayExpandAble] = useState(true);
  const [loadingCount, setLoadingCount] = useState(false);

  const closeButtonSkinAds = () => {setDisplayExpandAble(false)}

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
      {displayExpandAble === true && (
        <>
          <a
            href={data?.url}
            onClick={() => handleClickCount(data?._id)}
          >
            <div
              className="fixed bottom-0 z-50 w-full p-2 right-10 banner_bottom"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "300px",
                width: "400px",
                bottom: "5%",
                // left:"15%",
                transform: "translate(-50%, -50%);",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
            </div>
          </a>
          <div className="flex flex-row items-baseline justify-center h-full ">
            <div
                className="fixed z-50 py-1 m-3 text-center cursor-pointer"
                onClick={() => closeButtonSkinAds()}
                style={{
                  right: "3%",
                  bottom: "29%",
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
