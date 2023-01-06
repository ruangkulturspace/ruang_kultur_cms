import {
  Button,
  Form,
  Input,
  Row,
  notification,
  Spin,
  Col,
  Message,
} from "antd";

import styled from "styled-components";
// import { useAppState } from './shared/AppProvider';
import { useAppState } from "../components/shared/AppProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  PushNavigateTo,
  ReplaceNavigateTo,
  showError,
  showSuccess,
} from "../utils/helpersBrowser";
import { requestPost } from "../utils/baseService";
import { handleSessions } from "../utils/helpers";

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signin = ({ form, session }) => {
  // const [state] = useAppState();
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { code, redirect } = router.query;

  // useEffect(() => {
  //   if (code == "2") {
  //     showError("Error", "Harap Login terlebih dahulu.");
  //   }
  //   if (code == "1") {
  //     showSuccess("Success", "Berhasil logout.");
  //   }
  // }, [code]);

  useEffect(() => {
    // console.log("asd", session);
    if (session?.data?.user?.role ?? false) {
      // ReplaceNavigateTo(redirect ?? "/")
      const role = session?.data?.user?.role;
      switch (role) {
        case 'admin':
          PushNavigateTo('/admin');
          break;
        case 'superadmin':
          PushNavigateTo('/');
          break;
        case 'user':
          PushNavigateTo('/dashboardopsel');
          break;
        default:
          break;
      }
    } else {
      if (code == '3') {
        showError('Sesi login telah habis, silahkan login kembali.');
      }
      if (code == '2') {
        showError('Harap Login terlebih dahulu.');
      }
      if (code == '1') {
        showSukses('Berhasil logout.');
      }
    }
  }, [code]);

  function showSukses(msg) {
    notification['success']({
      message: 'Sukses!',
      description: msg,
    });
  }

  const handleLogin = async (values) => {
    setLoading(true);
    if (values.username == '') {
      showError('Username tidak boleh kosong!!');
    }

    if (values.password == '') {
      showError('Password tidak boleh kosong!!');
    }

    var response = await requestPost('', '/api/login', values);
    setLoading(false);
    if (response?.status == 200) {
      Message.success('Sign complete. Taking you to your dashboard!', 0.1).then(
        () =>
          ReplaceNavigateTo(redirect ?? "/dashboard")
        ,
      );
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="stylesheet" href="/css/login.css" />
      </Head>

      <Spin tip="Memuat..." size="large" spinning={loading}>
        <Row
          type="flex"
          align="middle"
          justify="center"
          className={
            state.mobile ? "mh-page withbg-jon-mobile" : "mh-page withbg-jon"
          }
          style={{ minHeight: "100vh" }}
        >
          <Content>
            <div className="mb-5 text-center">
              <img src="/assets/icons/Asset_6.png" height="60px" alt="Logo" />
            </div>

            <Form layout="vertical" onFinish={handleLogin}>
              <FormItem
                name="username"
              >
                <Input
                  prefix={<img src="/images/icon/login/mail.svg" alt="mail" />}
                  type="text"
                  placeholder="Email"
                />
              </FormItem>

              <FormItem
                style={{ marginBottom: "0" }}
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<img src="/images/icon/login/key.svg" alt="pass" />}
                  type="password"
                  placeholder="Password"
                />
              </FormItem>
              <FormItem>
                <div style={{ float: "right" }}>
                  <a
                    onClick={() => {
                      PushNavigateTo("/forgot");
                    }}
                    style={{
                      color: "#33539E",
                      fontSize: "12px",
                      marginTop: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Lupa Password ?
                  </a>
                </div>
              </FormItem>

              <FormItem
                name="remember"
                valuePropName="checked"
                initialValue={true}
              >
                <Row gutter={[20, 20]}>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button
                      onClick={() => {
                        PushNavigateTo("/signup");
                      }}
                      type="primary"
                      htmlType="button"
                      block
                      style={{
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Register
                    </Button>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Button
                      style={{
                        background: "#33539E",
                        borderColor: "#33539E",
                        borderRadius: "20px",
                      }}
                      type="primary"
                      htmlType="submit"
                      block
                      className="colorWhite"
                    >
                      Log in
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Content>
        </Row>
      </Spin>
    </>
  );
};

export async function getServerSideProps(context) {
  let checkSessions = await handleSessions(context, false);
  return checkSessions;
}


export default Signin;
