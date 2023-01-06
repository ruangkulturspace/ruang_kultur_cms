import React, { useEffect, useState } from "react";
import { Layout } from "antd";

// components
import SideNavigation from "../SideNavigation";
import TopMenu from "../TopMenu";

// css
import "antd/dist/antd.css";
import LoginPage from "../../pages/login";
import Head from "next/head";
import { useRouter } from "next/router";
import Notification from "../Notification";

const { Content, Footer } = Layout;

const DashboardLayout = ({ auth, items, title, children }) => {
  const router = useRouter();
  const [role, setRole] = useState(auth?.userData?.role);

  // notification drawer
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // sidebar opener
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const toggleSidebarVisibility = () => {
    setSidebarVisible((prev) => !prev);
    if (displaySidebar === false) {
      setDisplaySidebar(true);
    }
  };

  if (sidebarVisible === false) {
    setTimeout(() => {
      setDisplaySidebar(false);
    }, 390);
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Head className="h-10">
          <title>Ruang Kultur | {title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <SideNavigation
          auth={auth}
          sidebarVisible={sidebarVisible}
          style={{
            backgroundColor: "var(--cnblue)",
            color: "white",
            position: "relative",
            display: sidebarVisible
              ? "inline"
              : displaySidebar
              ? "inline"
              : "none",
            animation: sidebarVisible
              ? `sidebarAnimate 0.3s`
              : `sidebarClosing 0.4s`,
          }}
        />

        <Layout className="site-layout">
          <Content className="overflow-scroll h-90vh no-scrollbar">
            <TopMenu
              auth={auth}
              showDrawer={showDrawer}
              dashboardLayout={true}
              toggleSidebarVisibility={toggleSidebarVisibility}
              items={items}
              style={{
                animation: sidebarVisible
                  ? `sidebarAnimate 0.3s`
                  : `sidebarClosing 0.3s`,
              }}
            />
            {/* ================ CONTENT AREA  ============== */}
            <div className="px-6 pt-6">{children}</div>
            {/* ================ CONTENT AREA  ============== */}
            <Footer
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "white",
                backgroundColor: "var(--cnblue)",
                margin: "0 1.5rem 1.5rem 1.5rem",
                borderRadius: "0px 0px 20px 20px",
              }}
            >
              Copyright © 2022 | Badan Aksesibilitas Telekomunikasi dan
              Informasi Kominfo
            </Footer>
          </Content>
        </Layout>

        <Notification onClose={onClose} visible={visible} />
      </Layout>
    </>
  );
};

export default DashboardLayout;
