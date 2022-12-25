import { Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import { requestGet } from "../../utils/baseService";
import { showAlert } from "../NotificationAntd";

const CardStats = ({ auth }) => {
  const token = auth?.token;

  const [loading, setLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState({});
  const getDataCard = async () => {
    try {
      setLoading(true);
      let res = await requestGet(`v1/dashboard`, { token });
      if (res?.meta?.code === 200) {
        setLoading(false);
        setDataDashboard(res?.data);
      }
    } catch (err) {
      setLoading(false);
      showAlert("Error!", `Gagal mendapatkan data dashboard ${err?.message}`);
    }
  };

  useEffect(() => {
    getDataCard();

    return () => {};
  }, []);

  return (
    <div className="flex flex-row gap-5 justify-between flex-wrap">
      <div className="grow bgRkGreen lg:w-1/5 md:w-1/3 sm:w-1/2 px-5 py-4 rounded-lg cW text-xs flex flex-row gap-5 items-center">
        <div
          style={{ borderRadius: "100px", width: "45px", height: "45px" }}
          className="bgW aspect-square"
        />
        <div>
          {loading ? (
            <Skeleton.Button active block={true} size="small" />
          ) : (
            <p className="mb-0 text-base font-semibold">
              {dataDashboard?.class_count}
            </p>
          )}
          <p className="mb-0">Kelas</p>
        </div>
      </div>
      <div className="grow bg-[#349AFE] lg:w-1/5 md:w-1/3 sm:w-1/2 px-5 py-4 rounded-lg cW text-xs flex flex-row gap-5 items-center">
        <div
          style={{
            borderRadius: "100px",
            width: "45px",
            height: "45px",
          }}
          className="bgW aspect-square"
        />
        <div>
          {loading ? (
            <Skeleton.Button active block={true} size="small" />
          ) : (
            <p className="mb-0 text-base font-semibold">
              {dataDashboard?.pendaftar_count}
            </p>
          )}
          <p className="mb-0">Pendaftar</p>
        </div>
      </div>
      <div className="grow bg-[#F9B115] lg:w-1/5 md:w-1/3 sm:w-1/2 px-5 py-4 rounded-lg cW text-xs flex flex-row gap-5 items-center">
        <div
          style={{ borderRadius: "100px", width: "45px", height: "45px" }}
          className="bgW aspect-square"
        />
        <div>
          {loading ? (
            <Skeleton.Button active block={true} size="small" />
          ) : (
            <p className="mb-0 text-base font-semibold">
              {dataDashboard?.peserta_count}
            </p>
          )}
          <p className="mb-0">Peserta</p>
        </div>
      </div>
      <div className="grow bg-[#1FB863] lg:w-1/5 md:w-1/3 sm:w-1/2 px-5 py-4 rounded-lg cW text-xs flex flex-row gap-5 items-center">
        <div
          style={{ borderRadius: "100px", width: "45px", height: "45px" }}
          className="bgW aspect-square"
        />
        <div>
          {loading ? (
            <Skeleton.Button active block={true} size="small" />
          ) : (
            <p className="mb-0 text-base font-semibold">
              {dataDashboard?.lulus_count}
            </p>
          )}
          <p className="mb-0">Peserta Lulus</p>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
