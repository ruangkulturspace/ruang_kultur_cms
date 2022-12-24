import React,{ useEffect } from "react";
import {
  Button,
  Menu,
  Form,
  Input,
  Message,
  Row,
  notification,
  Spin,
  Col,
  Dropdown,
  Avatar,
  Card,
  Layout,
  Table
} from "antd";

const { Content } = Layout;

import { useState } from "react";
import Head from "next/head";

import { getSiteMatchmaking } from "../../utils/services/site"

export default function SiteMatchmaking() {
 
  const [batch, setBatch] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Batch",
      dataIndex: "judul",
      key: "judul",
    },
    {
      title: "No Surat Permintaaan RFI",
      dataIndex: "no_doc_permohonan_rfi",
      key: "no_doc_permohonan_rfi",
    },
   
    {
      title: "Tanggal Dimulai",
      dataIndex: "tanggal_mulai_kerja",
      key: "tanggal_mulai_kerja",
    },
    {
      title: "Tanggal Selesai",
      dataIndex: "tanggal_selesai_kerja",
      key: "tanggal_selesai_kerja",
    },
    {
      title: "Teknologi",
      dataIndex: "tech_type",
      key: "tech_type",
    },
  ];

  const fetchData = async (data = pagination) => {
    setLoading(true);
    getSiteMatchmaking().then(res => {
      console.log(" ==> ",res)
      setBatch(res.values)
    })
    .catch(err => {
      console.log(err)
    })
   
  };

  useEffect(() => { 
    fetchData()
  })

  return (
    <div>
      <Head>
        <title> Site Matchmaking </title>
      </Head>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Content style={{ backgroundColor: "white", padding: 30 }}>
           

            <Table dataSource={batch} columns={columns} />
          </Content>
        </Col>
      </Row>
    </div>
  );
}
