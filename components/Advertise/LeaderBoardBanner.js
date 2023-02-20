import React, { useState } from 'react'

export default function LeaderBoardBanner({data, key}) {
  const [displayBillboard, setDisplayBillboard] = useState(true);

  const closeButtonLeaderBoard = () => {setDisplayBillboard(false)}

  return (
    <>
      {displayBillboard === true && (
        <>
          <a href={data?.url}>
            <div
              className="fixed left-0 right-0 z-50 w-full p-2 top-5 banner_top"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "90px",
                width: "720px",
                top: "8%",
                left:"25%",
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
                className="fixed z-50 px-2 py-1 m-3 text-center cursor-pointer top-5"
                onClick={() => closeButtonLeaderBoard()}
                style={{
                  right: "20%"
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
