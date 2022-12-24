import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Login from "../../pages/login";
import style from "../../styles/mobile.module.css";

import { Drawer, Button } from "antd";
// import components
import NavigationBar from "../navigationBar/NavigationBar";
import Notification from "../notification";

const Layout = ({ title, children }) => {
  // ketika scroll header ada shadow
  const router = useRouter();
  const [headerShadow, setHeaderShadow] = useState("");

  const handleScroll = (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      setHeaderShadow("shadowNone");
    } else if (
      element.scrollHeight - element.scrollTop ===
      element.clientHeight
    ) {
      setHeaderShadow("shadowBaktiBottom rounded-b-2xl");
    } else {
      setHeaderShadow("shadowBaktiBottom rounded-b-2xl");
    }
  };

  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("roleName") === "staffsurveyor") {
      setLoggedIn(true);
    }
  }, []);

  // ===================== TESTING DRAWER
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // wrapper supaya lebarnya tidah 100vw:

  return (
    <>
      {loggedIn ? (
        <div
          className={`container h-screen min-h-screen max-h-screen mx-auto max-w-xl relative overflow-hidden `}
          style={{ marginBottom: "-40px" }}
        >
          <Head className='h-10'>
            <title>AI - {title}</title>
            <meta
              name='SMASLAB WEB AI'
              content='SMASLAB by Badan Aksesibilitas Telekomunikasi dan Informasi'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <header
            className={`h-20 px-4 absolute top-0 w-full z-50 flexboxRowBetween alignEndImp bgBaktiBlue pb-3 ${headerShadow}`}
          >
            <div className='flexboxRowCenter gap-4 cW'>
              {/* ======= BACK ICON  */}
              {title !== "Dashboard" && (
                <span
                  onClick={() => {
                    router.back();
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 19l-7-7m0 0l7-7m-7 7h18'
                    />
                  </svg>
                </span>
              )}
              <h1 className='text-xl m-0 p-0 text-white'>{title}</h1>
            </div>
            {/* ======= NOTIF ICON  */}
            <Button type='link' onClick={showDrawer}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='#fff'
              >
                <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
              </svg>
            </Button>
          </header>

          <main
            className='mb-auto h-full overflow-auto no-scrollbar pb-36'
            onScroll={(e) => handleScroll(e)}
          >
            {children}
          </main>

          <Notification onClose={onClose} visible={visible} />
        </div>
      ) : (
        <div
          className={`container h-screen min-h-screen max-h-screen mx-auto max-w-xl relative overflow-hidden `}
        >
          <Login />
        </div>
      )}
    </>
  );
};

export default Layout;
