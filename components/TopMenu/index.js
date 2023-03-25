import React, { useEffect, useState } from "react";
import { Menu, Breadcrumb, Dropdown, Space, Badge } from "antd";
// css
import "antd/dist/antd.css";

import { useRouter } from "next/router";
import {
  DownOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { requestGetWithoutSession } from "../../utils/baseService";
import { useAppState } from "../shared/AppProvider";

const TopMenu = ({session}) => {
  const [state, dispatch] = useAppState();
  const router = useRouter();
  const pathname = router.pathname;

  const [type, setType] = useState()
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
      setLoading(true);
      var params = {};

      const datar = await requestGetWithoutSession(
        session,
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/category/list",
        {
          params: params,
        }
      );
      setLoading(false);

      if (datar?.data?.statusCode == 200) {
        setType(datar?.data?.data ?? []);
      }
  }

  useEffect(() => {
      fetchData();
  }, []);

  const smallMenu = (
    <Menu>
      {type?.map((k,v) => {
        return <Menu.Item
          key={v}
          onClick={() => {
            router.push(`/kanal?type=${k.name}`);
          }}
        >
          {k.name}
        </Menu.Item>
      })}
    </Menu>
  );

  return (
    <>
      <div className="z-10 flex flex-row items-center justify-between w-full px-5 py-3 bgW drop-shadow">
        <div className="flex flex-row items-center w-full gap-8">
          <Link href="/">
            <a>
              <img src="/assets/icons/logo_ruang_kultur.gif" alt="logo" height={100} width={180} />
            </a>
          </Link>
          <div className="flex-row items-center justify-start hidden gap-8 lg:flex app-subnav__link">
            <Link
              className={pathname === "/kanal" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURATIF"
            >
              KULTURATIF
            </Link>
            <Link
              className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURAMA"
            >
              KULTURAMA
            </Link>
            <Link
              className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURNEMA"
            >
              KULTURNEMA
            </Link>
            <Link
              className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURMAIN"
            >
              KULTURMAIN
            </Link>
            <Link
              className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURAGA"
            >
              KULTURAGA
            </Link>
            <Link
              className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURGAYA"
            >
              KULTURGAYA
            </Link>
            <Link
              className={pathname === "/tentang-kami" ? `cCnBlue` : `cLg`}
              href="/kanal?type=KULTURBISNIS"
            >
              KULTURBISNIS
            </Link>
          </div>
          <div className="flex flex-row items-center justify-end w-full lg:hidden md:justify-start">
            <Dropdown overlay={smallMenu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()} className="text-dark">
                <Space size="small">
                  <div className="pt-0.5">
                    {pathname === "/"
                      ? "MORE"
                      : pathname === "/kanal?type=KULTURAMA"
                      ? "KULTURNEMA"
                      : pathname === "/kanal?type=KULTURNEMA"
                      ? "KULTURMAIN"
                      : pathname === "/kanal?type=KULTURMAIN"
                      ? "KULTURAGA"
                      : pathname === "/kanal?type=KULTURAGA"
                      ? "KULTURGAYA"
                      : pathname === "/kanal?type=KULTURGAYA"
                      ? "KULTURBISNIS"
                      : pathname === "/kanal?type=KULTURBISNIS"
                    }
                  </div>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMenu;
