import { Avatar, Badge, Layout, List, Menu, Dropdown } from "antd";
import {
  BellTwoTone,
} from "@ant-design/icons";
import DashHeader, { Notification } from "./styles/Header";

import Link from "next/link";
import MockNotifications from "../demos/mock/notifications";
import { useAppState } from "./shared/AppProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { PushNavigateTo, ReplaceNavigateTo } from "../utils/helpersBrowser";
import { requestGet } from "../utils/baseService";

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = ({ session, fromDashboard = false }) => {
  const [state, dispatch] = useAppState();
  const [notifications] = useState(MockNotifications);
  const [dataUser, setDataUser] = useState([]);

  const doLogout = async () => {
    // tinggal logout aj
    var logout = await axios.get("/api/logout");
    if (logout?.data?.code == 0) {
        ReplaceNavigateTo('/login?code=1')
    }
  };

  const redirectProfile = async () => {
    PushNavigateTo("/profile");
  };

  useEffect(() => {
    FetchUserProfile({ });
    return () => { };
  }, [state]);

  const FetchUserProfile = async ({}) => {
      // setLoading(true);

      const datar = await requestGet(
          session,
          process.env.NEXT_PUBLIC_API_URL + '/api/v1/user/profile',
      );
      setDataUser(datar?.data?.data ?? null);
      // setLoading(false);
  };

  const menuDesktop = (
    <>
      <Menu className="text-dark">
        <Menu.Item>Settings</Menu.Item>
      </Menu>
      <Menu className="text-dark">
        <Menu.Item>Profile</Menu.Item>
      </Menu>
      <Menu.Divider />
      <Menu className="text-dark" onClick={doLogout}>
        <Menu.Item>Signout</Menu.Item>
      </Menu>
    </>
  );

  return (
    <DashHeader>
      <Header>
        <Menu mode="horizontal">
          {state.mobile && (
            <Menu.Item>
              <a
                onClick={() => dispatch({ type: "mobileDrawer" })}
                className="trigger"
              >
                <svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 384.97 384.97"
                  style={{ enableBackground: "new 0 0 384.97 384.97" }}
                  xmlSpace="preserve"
                >
                  <g id="Menu_1_">
                    <path
                      d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
                      c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z"
                    />
                    <path
                      d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
                      S379.58,180.455,372.939,180.455z"
                    />
                    <path
                      d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606
                      c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z"
                    />
                  </g>
                </svg>
              </a>
            </Menu.Item>
          )}
          {!state.mobile && (
            <div
              onClick={() => {
                dispatch({ type: "collapse" });
              }}
              className="mx-4 pointer"
            >
              <img alt="bar" src="/images/icon/bars.svg" />
            </div>
          )}

          <span className="mr-auto" />

          <Dropdown overlay={menuDesktop}>
            <div className="mr-3" style={{ cursor: "pointer" }}>
              <Avatar className="mx-4 my-auto pointer" src={session?.data?.user?.avatar ? `${process.env.NEXT_PUBLIC_API_URL}/public/${session?.data?.user?.avatar}` : "/images/avatar.jpg"} />
              <span
                className="mr-1"
                style={{ fontWeight: "bold", color: "#33539E" }}
              >
                {dataUser?.firstName
                  ? "Hi, " + dataUser?.firstName.toUpperCase()
                  : "-"}
              </span>
              <img src="/images/icon/arrow-down-blue.svg" alt="ardown" />
            </div>
          </Dropdown>
        </Menu>
      </Header>
    </DashHeader>
  );
};

export default MainHeader;
