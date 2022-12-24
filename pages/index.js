import Head from "next/head";
// import Overview from '../components/Overview';
import { useAppState } from "../components/shared/AppProvider";
import { useEffect, useState } from "react";

import { Button, Row, Col, notification, Table } from "antd";
import { getRandomUser } from "../utils/services/getRandomUser";
import withAuth from "../utils/withAuth";
import { showError, showSuccess } from "../utils/helpersBrowser";

const OverviewPage = ({ auth }) => {
  console.log(auth);
  const [_state, dispatch] = useAppState();

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/react-vis.css" />
        <title>Dashboard Home Admin</title>
      </Head>

      <Row className="mb-4">
        <Col xs={24} sm={24} md={12} lg={12}>
          <Button type="primary" onClick={() => showError('error', 'error')} danger>
            Show Error
          </Button>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Button type="primary" onClick={() => showSuccess('success', 'success')}>
            Show Sukses
          </Button>
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps = withAuth(async ({ auth }) => {
  return {
    props: { auth },
  };
});

export default OverviewPage;
