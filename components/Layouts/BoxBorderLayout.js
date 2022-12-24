import React from "react";

const BoxBorderLayout = ({ children }) => {
  return (
    <div className='border border-gray-300 rounded p-4 my-6'>{children}</div>
  );
};

export default BoxBorderLayout;
