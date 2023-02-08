import React, { useState } from 'react'

export default function SuperLeaderBoardBanner({data, key}) {
  const [displaySuperLeaderBoard, setDisplaySuperLeaderBoard] = useState(true);

  const closeButtonSuperLeaderBoard = () => {setDisplaySuperLeaderBoard(false)}

  return (
    <>
      {displaySuperLeaderBoard === true && (
        <>
          <a href={data?.url}>
            <div
              className="fixed left-0 right-0 z-50 w-full p-2 top-5 banner_top"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "90px",
                width: "970px",
                top: "20%",
                left:"25%",
                transform: "translate(-50%, -50%);",
              }}
            >
            </div>
          </a>
          <div className="flex flex-row items-baseline justify-center h-full">
            <div
                className="fixed z-50 px-2 py-1 m-3 text-center cursor-pointer top-28"
                onClick={() => closeButtonSuperLeaderBoard()}
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
