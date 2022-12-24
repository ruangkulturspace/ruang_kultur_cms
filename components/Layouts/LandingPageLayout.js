import React from "react";
import Footer from "../Footer";
import TopMenu from "../TopMenu";
import Head from "next/head";

const LandingPage = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Ruang Kultur | {title}</title>
      </Head>
      <div
        className="bgBg relative"
        style={{ maxWidth: "100vw", overflowX: "hidden", height: "100vh" }}
      >
        <div className="sticky top-0 z-10">
          <TopMenu />
        </div>
        <div style={{ minHeight: "calc(100vh - 382px)" }}>{children}</div>
        {/* <div className="static bottom-0"> */}
        <Footer />
        {/* </div> */}
      </div>
    </>
  );
};

export default LandingPage;
