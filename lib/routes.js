import { BoxPlotOutlined, FileOutlined, HomeOutlined, HomeTwoTone, ShoppingTwoTone, UserOutlined, } from '@ant-design/icons';

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
    path: "/article",
    children: [
      {
        path: "/newest",
        name: "Newest",
      },
      // {
      //   path: "/type",
      //   name: "Type",
      // },
      {
        path: "/article",
        name: "Article",
      }
    ],
    name: "Article",
    icon: <FileOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/banner",
    name: "Banner",
    icon: <BoxPlotOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/users",
    name: "User Management",
    icon: <UserOutlined style={{ fontSize: '16px' }} />
  },
];

export default routes;
