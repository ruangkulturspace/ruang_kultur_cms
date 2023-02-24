import { BoxPlotOutlined, DashboardOutlined, FileOutlined, FileTextOutlined, HomeOutlined, HomeTwoTone, ShoppingTwoTone, UserOutlined, } from '@ant-design/icons';

const routes = [
  {
    path: "/",
    name: "Landing Page",
    icon: <HomeOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardOutlined style={{ fontSize: '16px' }} />
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
    path: "/page-view",
    children: [
      {
        path: "/page-view",
        name: "Article Page View",
      },
      {
        path: "/banner-report",
        name: "Banner Report",
      },
    ],
    name: "Report",
    icon: <FileTextOutlined style={{ fontSize: '16px' }} />
  },
  {
    path: "/users",
    name: "User Management",
    icon: <UserOutlined style={{ fontSize: '16px' }} />
  },
];

export default routes;
