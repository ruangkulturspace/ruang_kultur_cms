import React from "react";
import Footer from "../Footer";
import TopMenu from "../TopMenu";
import Head from "next/head";

const LandingPage = ({ children, title, session}) => {

  return (
    <>
      <Head>
        <title>Ruang Kultur | {title}</title>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
            `,
          }}
        />
      </Head>
      <div
        className="relative bgBg"
        style={{ maxWidth: "100vw", overflowX: "hidden", height: "100vh" }}
      >
        <div className="sticky top-0 z-10">
          <TopMenu />
        </div>
        <div style={{ minHeight: "calc(100vh - 382px)" }}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
