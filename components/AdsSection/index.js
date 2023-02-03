import React from "react";

const AdsSection = () => {
  return (
    <div className="flex flex-col p-10 bgImgRk md:p-28">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="flex flex-col justify-between">
          <p className="my-0 text-3xl font-bold">Our Service</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-5 pt-10 pb-10 md:flex-row md:gap-10 lg:gap-32">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold"><u>CONTENT TAP</u></p>
          <p className="text-xs">
            Content Tap makes it easy to centrally manage, create, distribute and track documents, images and videos.gives client easy access to relevant content or mobile or web{" "}
          </p>
        </div>
        {/* <div className="inline border border-inherit md:hidden"></div> */}
        <div className="w-full md:w-1/2 lg:w-1/5">
          <p className="text-lg font-bold"><u>MEDIA PARTNER</u></p>
          <p className="text-xs">
            Media partners own advertisement space in some capacity, selling space (known as inventory) to advertisers for a limited time. In mobile marketing, partners own in-app and web traffic. They are integrated into apps on which they sell advertising.{" "}
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <p className="text-lg font-bold"><u>PLACEMENT ADS</u></p>
          <p className="text-xs">
            Ads placement include all advertising spaces, mostly paid, offered by online publishers, websites, and social networks to advertisers to display their advertisements.{" "}
          </p>
        </div>
        {/* <div className="inline border border-inherit md:hidden"></div> */}
      </div>
    </div>
  );
};

export default AdsSection;
