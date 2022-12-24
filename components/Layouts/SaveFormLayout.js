import { data } from "autoprefixer";
import React, { useState } from "react";
import Save from "../form/Save";
import Submit from "../form/Submit";

const SaveFormLayout = ({
  _id,
  dataEdit,
  idSurvey,
  datatable,
  display,
  children,
}) => {
  return (
    <div>
      {children}
      <div className={`flexboxColCenter gap-4 px-6 ${display}`}>
        {/* <div className={`flexboxColCenter gap-4 px-6`}> */}
        <Save idSurvey={idSurvey} _id={_id} />
        <Submit
          idSurvey={idSurvey}
          datatable={datatable}
          _id={_id}
          dataEdit={dataEdit}
        />
      </div>
    </div>
  );
};

export default SaveFormLayout;
