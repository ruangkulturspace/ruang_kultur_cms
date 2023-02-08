import React, { useState } from 'react'

export default function FixHangingBottom({data, key}) {
  const [displayHangingBottom, setDisplaySkinAd] = useState(true);

  const closeButtonSkinAds = () => {setDisplaySkinAd(false)}
  return (
    <>
      {displayHangingBottom === true && (
        <>
          <a href={data?.url}>
            <div
              className="fixed bottom-0 left-0 right-0 z-50 w-full p-2 banner_bottom"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "50px",
                width: "970px",
                bottom: "8%",
                left:"15%",
                transform: "translate(-50%, -50%);",
              }}
            >
            </div>
          </a>
          <div className="flex flex-row items-baseline justify-center h-full">
            <div
                className="fixed z-50 py-1 m-3 text-center cursor-pointer"
                onClick={() => closeButtonSkinAds()}
                style={{
                  right: "10%",
                  bottom: "8%",
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
