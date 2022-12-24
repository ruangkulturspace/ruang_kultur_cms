import React, { useState } from "react";
import Save from "../form/Save";

const SectionLayout = ({ title, idSurvey, children }) => {
  return (
    <div className={`my-10 p-10 bgW rounded-lg`}>
      <h1 className='text-xl cBaktiBlue bBaktiBlue mb-6 pb-2 border-b-2'>
        {title}
      </h1>
      {children}
      {/* <Save idSurvey={idSurvey} /> */}
    </div>
  );
};

export default SectionLayout;
