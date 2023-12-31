/* eslint-disable react/jsx-key */
import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  List,
  Menu,
  Popconfirm,
  Row,
  Switch,
  Tooltip
} from 'antd';
import { FolderTwoTone, PlaySquareTwoTone, PushpinTwoTone } from '@ant-design/icons';
import { capitalize, lowercase } from '../lib/helpers';
import { useEffect, useState } from 'react';

import DashHeader from './styles/Header';
import Inner from './styles/Sidebar';
import Link from 'next/link';
import Routes from '../lib/routes';
import { useAppState } from './shared/AppProvider';
import { withRouter } from 'next/router';

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

let rootSubMenuKeys = [];

const getKey = (name, index) => {
  const string = `${name}-${index}`;
  let key = string.replace(' ', '-');
  return key.charAt(0).toLowerCase() + key.slice(1);
};

const UserMenu = (
  <Menu>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Notifications</Menu.Item>
  </Menu>
);

const SidebarContent = ({
  sidebarTheme,
  sidebarMode,
  sidebarIcons,
  collapsed,
  router
}) => {
  const [state, dispatch] = useAppState();
  const [openKeys, setOpenKeys] = useState([]);
  const [appRoutes] = useState(Routes);
  const { pathname } = router;

  const badgeTemplate = badge => <Badge count={badge.value} className={`${state.direction === 'rtl' ? 'left' : 'right'}`} />;

  useEffect(() => {
    appRoutes.forEach((route, index) => {
      const isCurrentPath =
        pathname.indexOf(lowercase(route.name)) > -1 ? true : false;
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
      if (isCurrentPath) setOpenKeys([...openKeys, key]);
    });
    // forEach((route, index) => {
    //   const isCurrentPath =
    //     pathname.indexOf(lowercase(route.name)) > -1 ? true : false;
    //   const key = getKey(route.name, index);
    //   rootSubMenuKeys.push(key);
    //   if (isCurrentPath) setOpenKeys([...openKeys, key]);
    // })
  }, []);

  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.slice(-1);
    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys([...latestOpenKey]);
    } else {
      setOpenKeys(latestOpenKey ? [...latestOpenKey] : []);
    }
  };

  const menu = (
    <>
      <Menu
        theme={sidebarTheme}
        className="border-0 scroll-y sidebar"
        style={{ flex: 1, height: '100%' }}
        mode={sidebarMode}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <div style={{ margin: "40px 0px" }} className="nmsLogoDiv">
          <center>
            {
              !state.collapsed ?
                <img width="50%" src="/assets/icons/Asset_7.png" alt="Logo" /> :
                <img height="35px" src="/assets/icons/LOGO_DEVELOPE_rK-12.png" alt="Bakti Logo" />
            }
          </center>
        </div>
        {appRoutes.map((route, index) => {
          const hasChildren = route.children ? true : false;
          const split = pathname.split("/");
          const isCurrentPath = route.path.split("/")[1] === split[1];
          if (!hasChildren)
            return (
              <Menu.Item
                key={getKey(route.name, index)}
                className={
                  isCurrentPath ? 'ant-menu-item-selected' : ''
                }
                onClick={() => {
                  setOpenKeys([getKey(route.name, index)]);
                  if (state.mobile) dispatch({ type: 'mobileDrawer' });
                }}
                icon={sidebarIcons && route.icon}
              >
                <Link href={route.path}>
                  <a>
                    <span className="mr-auto">{capitalize(route.name)}</span>
                    {route.badge && badgeTemplate(route.badge)}
                  </a>
                </Link>
              </Menu.Item>
            );

          if (hasChildren)
            return (
              <SubMenu
                key={getKey(route.name, index)}
                icon={sidebarIcons && route.icon}
                title={<>
                  <span className='text-dark'>{capitalize(route.name)}</span>
                  {route.badge && badgeTemplate(route.badge)}
                </>
                }
              >
                {route.children.map((subitem, index) => (
                  <Menu.Item
                    key={getKey(subitem.name, index)}
                    className={
                      pathname === subitem.path ? 'ant-menu-item-selected' : ''
                    }
                    onClick={() => {
                      if (state.mobile) dispatch({ type: 'mobileDrawer' });
                    }}
                  >
                    <Link href={`${subitem.path ? subitem.path : ''}`}>
                      <a>
                        <span className="mr-auto">
                          {capitalize(subitem.name)}
                        </span>
                        {subitem.badge && badgeTemplate(subitem.badge)}
                      </a>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
        })}
      </Menu>
    </>
  );

  return (
    <>
      <Inner>
        {!state.mobile && (
          <Sider
            width={220}
            className={`bg-${sidebarTheme}`}
            theme={sidebarTheme}
            collapsed={collapsed}
          >
            {menu}
          </Sider>
        )}

        {state.mobile && (
          <Drawer
            closable={false}
            width={220}
            placement={`${state.direction === 'rtl' ? 'right' : 'left'}`}
            onClose={() => dispatch({ type: 'mobileDrawer' })}
            visible={state.mobileDrawer}
            className="chat-drawer"
          >
            <Inner>
              <div
                style={{
                  overflow: `hidden`,
                  flex: `1 1 auto`,
                  flexDirection: `column`,
                  display: `flex`,
                  height: `100vh`,
                  maxHeight: `-webkit-fill-available`,
                }}
              >
                {/* <DashHeader>
                  <Header>
                    <Link href="/">
                      <a className="mx-3 brand">
                        <PlaySquareTwoTone style={{ fontSize: '20px' }} />
                        <strong className="pl-2 text-black">{state.name}</strong>
                      </a>
                    </Link>
                  </Header>
                </DashHeader> */}
                {menu}
              </div>
            </Inner>
          </Drawer>)}

      </Inner>
    </>
  );
};

export default withRouter(SidebarContent);
