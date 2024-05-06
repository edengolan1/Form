import React from "react";
import "./DivData.css";

function DivData({ label, value }) {
  return (
    <div>
      <div className="divData">
        <label htmlFor="nameData" className="labelName">
          {label}
        </label>
        <input
          type="text"
          id="nameProcedure"
          value={value}
          className="inputData"
          readOnly
        />
      </div>
    </div>
  );
}

export default DivData;
