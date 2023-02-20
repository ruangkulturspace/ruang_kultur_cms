import React, { useState } from 'react'

export default function SkinAds({data, key}) {
  const [displaySkinAd, setDisplaySkinAd] = useState(true);

  const closeButtonSkinAds = () => {setDisplaySkinAd(false)}
  return (
    <>
      {displaySkinAd === true && (
        <>
          <a href={data?.url}>
            <div
              className="fixed top-0 left-0 right-0 z-50 w-full p-2 banner_top"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "600px",
                width: "160px",
                top: "8%",
                left:"3%",
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
                className="fixed z-50 py-1 m-3 text-center cursor-pointer"
                onClick={() => closeButtonSkinAds()}
                style={{
                  left: "14%",
                  top: "8%",
                  zIndex: "99999"
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
