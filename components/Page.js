import { Container, Inner } from "./styles/Page";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";

import Header from "./Header";
import SidebarMenu from "./SidebarMenu";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyles";
import { useAppState } from "./shared/AppProvider";
import { withRouter } from "next/router";
const { Content } = Layout;

// klo lu ga pengen pake template si one ini, tambahkan route yang diinginkan disini :
const NonDashboardRoutes = [
  "/login",
  "/signup",
  "/forgot",
  "/lockscreen",
  "/_error",
  "/reports/documentpdf",
  "/kanal",
  "/kanal-detail",
  "/"
];

const Page = ({ router, children, auth, session }) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useAppState();
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  return (
    <Spin tip="Memuat..." size="large" spinning={state.loading || loading}>
      <ThemeProvider theme={theme}>
        <Container
          className={`${state.weakColor ? "weakColor" : ""} ${
            state.boxed ? "boxed shadow-sm" : ""
          }`}
        >
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                sidebarTheme={state.darkSidebar ? "dark" : "light"}
                sidebarMode={state.sidebarPopup ? "vertical" : "inline"}
                sidebarIcons={state.sidebarIcons}
                collapsed={state.collapsed}
              />
            )}

            <Layout>
              <Content>
                {!isNotDashboard && <Header session={children?.props?.session}/>}
                {!isNotDashboard ? <Inner>{children}</Inner> : children}
                {!isNotDashboard && (
                  <center
                    style={{
                      backgroundColor: "#f7f8fc",
                      paddingBottom: "12px",
                      fontSize: "12px",
                    }}
                  >
                    © 2022 Ruang Kultur
                  </center>
                )}
              </Content>
            </Layout>
          </Layout>
        </Container>
      </ThemeProvider>
    </Spin>
  );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context);
  return checkSessions;
}

export default withRouter(Page);
