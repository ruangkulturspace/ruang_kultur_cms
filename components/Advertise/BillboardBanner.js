import React, { useState } from 'react'

export default function BillboardBanner({data, key}) {
  const [displayBillboard, setDisplayBillboard] = useState(true);

  const closeButtonBillboard = () => {setDisplayBillboard(false)}

  return (
    <>
      {displayBillboard === true && (
        <>
          <a href={data?.url}>
            <div
              className="fixed top-0 left-0 right-0 z-50 w-full p-2 banner_top"
              key={key}
              style={{
                background: `url("${data?.image?.completedUrl}") no-repeat`,
                height: "150px",
                width: "970px",
                top: "8%",
                left:"15%",
                transform: "translate(-50%, -50%);",
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
