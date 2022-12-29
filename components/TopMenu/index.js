import React, { useEffect, useState } from "react";
import { Menu, Breadcrumb, Dropdown, Space, Badge } from "antd";
// css
import "antd/dist/antd.css";

import Image from "next/image";

import { useRouter } from "next/router";
import {
  MenuOutlined,
  DownOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { isBrowser, ReplaceNavigateTo } from "../../utils/helpersBrowser";
import Link from "next/link";

const TopMenu = ({
  auth,
  showDrawer,
  dashboardLayout,
  items,
  toggleSidebarVisibility,
  style,
}) => {
  // console.log("console log nya auth", auth);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(auth?.userData?.role);

  const router = useRouter();
  const pathname = router.pathname;

  const doLogout = async () => {
    ReplaceNavigateTo("/api/logout");
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        icon={<UserOutlined />}
        onClick={() => {
          console.log("go to profile page");
          router.push("/profile");
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="1"
        icon={<LogoutOutlined />}
        onClick={() => {
          doLogout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  const smallMenu = (
    <Menu>
      <Menu.Item
        key="0"
        className="w-24"
        onClick={() => {
          router.push("/");
        }}
      >
        Kulturbumi
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          router.push("/tentang-kami");
        }}
      >
        Kulturgaya
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          router.push("/rilis-media");
        }}
      >
        Kulturnema
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          router.push("/kelas");
        }}
      >
        Kulturmain
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          router.push("/cek-sertifikat");
        }}
      >
        Kulturaga
      </Menu.Item>
      <Menu.Item
        key="5"
        onClick={() => {
          router.push("/kontak");
        }}
      >
        Kulturgaya
      </Menu.Item>
      <Menu.Item
        key="6"
        onClick={() => {
          router.push("/kontak");
        }}
      >
        Kulturbisnis
      </Menu.Item>
      <Menu.Item
        key="7"
        onClick={() => {
          router.push("/kontak");
        }}
      >
        Shop
      </Menu.Item>
      {/* {role ? (
        <>
          <Menu.Item
            key="6"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="6"
            onClick={() => {
              doLogout();
            }}
          >
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            key="6"
            onClick={() => {
              router.push("/login");
            }}
          >
            Masuk
          </Menu.Item>
          <Menu.Item
            key="7"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Daftar
          </Menu.Item>
        </> */}
      {/* )} */}
    </Menu>
  );

  let notiflist = [
    "Notifikasi baru dari Fulan!",
    "Notifikasi baru dari Fulan!",
    "Notifikasi baru dari Fulan!",
    "Notifikasi baru dari Fulan!",
  ];
  const notif = () => {
    return (
      <Menu style={{ padding: 0 }}>
        <Menu.Item
          key="0"
          style={{
            padding: "5px 15px",
            borderBottom: "1px solid lightgrey",
            color: "var(--medGrey)",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          <p className="mb-0 text-center">Anda memiliki 4 notifikasi baru</p>
        </Menu.Item>
        {notiflist?.map((e, index) => {
          return (
            <Menu.Item
              key={index}
              style={{
                padding: "10px 15px",
                borderBottom: "1px solid lightgrey",
              }}
              onClick={() => {
                router.push("/");
              }}
            >
              <div className="flex flex-row items-center gap-3">
                <Image
                  src="/assets/images/avatar/Icon.png"
                  alt="me"
                  width="30"
                  height="30"
                />
                <div className="flex flex-col">
                  <span className="text-xs cMedgrey">
                    Fulan<span className="float-right">4 menit yang lalu</span>
                  </span>
                  <span className="font-semibold">{e}</span>
                  <span className="text-xs cMedgrey">
                    Lorem ipsum dolor sit amet...
                  </span>
                </div>
              </div>
            </Menu.Item>
          );
        })}
        <Menu.Item
          key="5"
          style={{ padding: "5px 15px", color: "var(--medGrey)" }}
          onClick={() => {
            router.push("/kontak");
          }}
        >
          <span className="flex justify-center mb-0 cCnBlue">
            {"Lihat semua notifikasi >"}
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  if (dashboardLayout) {
    return (
      <div
        className="z-10 flex flex-row items-center justify-start w-full gap-8 px-10 py-5 bgW drop-shadow"
        style={style}
      >
        <MenuOutlined
          style={{ fontWeight: "bold", color: "grey", cursor: "pointer" }}
          onClick={() => {
            toggleSidebarVisibility();
          }}
        />
        <div className="flex items-center justify-between w-full">
          <Breadcrumb separator="\">
            {items?.map((e, index) => {
              if (index !== items.length - 1) {
                return (
                  <Breadcrumb.Item
                    key={index}
                    href={e?.href}
                    style={{
                      fontSize: "16px",
                      color: "var(--cnblue)",
                      fontWeight: "600",
                    }}
                  >
                    {e?.name}
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item
                    key={index}
                    href={e?.href}
                    style={{ fontSize: "14px", color: "var(--medGrey)" }}
                  >
                    {e?.name}
                  </Breadcrumb.Item>
                );
              }
            })}
          </Breadcrumb>
          <div className="flex flex-row items-center justify-end gap-5">
            <Dropdown overlay={notif} placement="bottomRight">
              <Badge count={notiflist?.length}>
                <BellOutlined
                  style={{ fontSize: "20px" }}
                  className="cMedgrey"
                />
              </Badge>
            </Dropdown>
            <Dropdown overlay={menu} placement="bottomCenter">
              <a
                className="flex flex-row items-center gap-5 ant-dropdown-link cB"
                onClick={(e) => e.preventDefault()}
              >
                <Image
                  src={`/assets/icons/avatar.png`}
                  width={36}
                  height={36}
                  alt={`avatar`}
                  className="rounded-full"
                />
                <span className="flex items-center gap-2 capitalize">
                  Hi, {auth?.userData?.name}!{" "}
                  <SmileOutlined style={{ fontSize: "18px" }} />
                </span>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="z-10 flex flex-row items-center justify-between w-full px-5 py-3 bgW drop-shadow">
          <div className="flex flex-row items-center w-full gap-8">
            <Link href="/">
              <a>
                <img src="/assets/icons/logo_ruang_kultur.gif" alt="logo" height={100} width={180} />
              </a>
            </Link>
            <div className="flex-row items-center justify-start hidden gap-8 lg:flex">
              <Link className={pathname === "/" ? `cCnBlue` : `cLg`} href="/">
                Kulturbumi
              </Link>
              <a
                className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
                href="/tentang-kami"
              >
                Kulturgaya
              </a>
              <div className="flex flex-row items-center justify-end md:justify-start">
                <Dropdown overlay={smallMenu} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()} className="text-dark">
                    <Space align="start" size="large">
                      <div className="pt-0.5">
                        {pathname === "/"
                          ? "More"
                          : pathname === "/tentang-kami"
                          ? "Kulturgaya"
                          : pathname === "/rilis-media"
                          ? "Kulturnema"
                          : pathname === "/kelas"
                          ? "Kulturmain"
                          : pathname === "/cek-sertifikat"
                          ? "Kulturaga"
                          : pathname === "/kontak"
                          ? "Kulturgaya"
                          : pathname === "/kontak"
                          ? "Kulturbisnis"
                          : pathname === "/kontak"
                          ? "Shop"
                          : pathname === "/kontak"
                        }
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <a
                className={pathname.includes("/kelas") ? `cCnBlue` : `cLg`}
                href="/kelas"
              >
                Shop
              </a>
            </div>
            <div className="flex flex-row items-center justify-end w-full lg:hidden md:justify-start">
              <Dropdown overlay={smallMenu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()} className="text-dark">
                  <Space align="start" size="large">
                    <div className="pt-0.5">
                      {pathname === "/"
                        ? "More"
                        : pathname === "/tentang-kami"
                        ? "Kulturgaya"
                        : pathname === "/rilis-media"
                        ? "Kulturnema"
                        : pathname === "/kelas"
                        ? "Kulturmain"
                        : pathname === "/cek-sertifikat"
                        ? "Kulturaga"
                        : pathname === "/kontak"
                        ? "Kulturgaya"
                        : pathname === "/kontak"
                        ? "Kulturbisnis"
                        : pathname === "/kontak"
                        ? "Shop"
                        : pathname === "/kontak"
                      }
                    </div>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            {/* <Dropdown overlay={menu} placement="bottomCenter">
            <a
              className="ant-dropdown-link cB"
              onClick={(e) => e.preventDefault()}
            >
              {username} <DownOutlined />
            </a>
          </Dropdown> */}
          </div>
          {/* <div
          onClick={() => {
            showDrawer();
          }}
        >
          <BellOutlined className="text-lg" />
        </div> */}
          {/* {role ? (
            <div className="flex-row items-center justify-end hidden gap-5 md:flex">
              <button
                className="btnCnBlueBorder"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="btnCnBlue"
                onClick={() => {
                  doLogout();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex-row items-center justify-end hidden gap-5 md:flex">
              <button
                className="btnCnBlueBorder"
                onClick={() => router.push("/login")}
              >
                Masuk
              </button>
              <button
                className="btnCnBlue"
                onClick={() => router.push("/signup")}
              >
                Daftar
              </button>
            </div>
          )} */}
        </div>
      </>
    );
  }
};

export default TopMenu;
