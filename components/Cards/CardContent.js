import React from "react";

const CardContent = ({ caller, title, subtitle, children }) => {
  return (
    <div
      className={
        caller === "detail"
          ? "my-10 bgW px-10 py-10 rounded-lg drop-shadow"
          : "mx-10 md:mx-20 my-10 bgW p-10 rounded-lg drop-shadow"
      }
    >
      <p className="font-bold text-3xl mt-0 mb-1">{title}</p>
      <p>{subtitle}</p>
      {children && (
        <>
          <div style={{ borderBottom: "1px solid lightgrey" }} />
          <div className="mt-5">{children}</div>
        </>
      )}
    </div>
  );
};

export default CardContent;
