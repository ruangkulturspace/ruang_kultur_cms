import { FileOutlined, HomeOutlined, HomeTwoTone, ShoppingTwoTone, UserOutlined, } from '@ant-design/icons';

const routes = [
  {
    path: "/",
    name: "Landing Page",
    icon: <HomeOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/site-matchmaking",
    children: [
      {
        path: "/category",
        name: "Category",
      },
      {
        path: "/type",
        name: "Type",
      },
      {
        path: "sitemanagementadm",
        name: "Article",
      }
    ],
    name: "Article",
    icon: <FileOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/users",
    name: "User Management",
    icon: <UserOutlined style={{ fontSize: '16px' }} />
  },
];

export default routes;
