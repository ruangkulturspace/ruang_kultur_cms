import React, { useState } from 'react'

export default function HalfPage({data, key}) {
  const [displayHalfPage, setDisplayHalfPage] = useState(true);

  const closeButtonSkinAds = () => {setDisplayHalfPage(false)}
  return (
    <>
      {displayHalfPage === true && (
        <>
          <a href={data?.url}>
            <div
              className="fixed bottom-0 z-50 w-full p-2 right-10 banner_bottom"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "600px",
                width: "300px",
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
                  top: "35%",
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
