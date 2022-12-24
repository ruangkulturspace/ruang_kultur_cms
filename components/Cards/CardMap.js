import React from "react";
import MapDashboard from "../Maps/DashboardMap";

const CardMap = () => {
  return (
    <div
      className={`flex flex-col gap-4 bgW rounded px-6 py-4 w-full h-96 w-full`}
    >
      <MapDashboard />
    </div>
  );
};

export default CardMap;
