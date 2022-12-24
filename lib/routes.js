import { HomeFilled, HomeOutlined, HomeTwoTone, ShoppingTwoTone, UserOutlined, } from '@ant-design/icons';

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <HomeOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/users",
    name: "User Management",
    icon: <UserOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/site-matchmaking",
    name: "Site Matchmaking",
    icon: <UserOutlined style={{ fontSize: '16px' }} />
  }
];

export default routes;