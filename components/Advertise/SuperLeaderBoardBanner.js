import React, { useState } from 'react'
import { requestPostWithoutSession } from '../../utils/baseService';
import { useAppState } from '../shared/AppProvider';

export default function SuperLeaderBoardBanner({data, key}) {
  const [state, dispatch] = useAppState();
  const [displaySuperLeaderBoard, setDisplaySuperLeaderBoard] = useState(true);
  const [loadingCount, setLoadingCount] = useState(false);

  const closeButtonSuperLeaderBoard = () => {setDisplaySuperLeaderBoard(false)}

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
      {displaySuperLeaderBoard === true && (
        <>
          <a
            href={data?.url}
            onClick={() => handleClickCount(data?._id)}
          >
            <div
              className="fixed left-0 right-0 z-50 w-full p-2 top-5 banner_top"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "90px",
                width: !(state.mobile) ? "75%" : "72%",
                top: "20%",
                left:"12%",
                transform: "translate(-50%, -50%);",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
            </div>
          </a>
          <div className="flex flex-row items-baseline justify-center h-full">
            <div
                className="fixed z-50 px-2 py-1 m-3 text-center cursor-pointer top-28"
                onClick={() => closeButtonSuperLeaderBoard()}
                style={{
                  right: !(state.mobile) ? "10%" : "5%"
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
