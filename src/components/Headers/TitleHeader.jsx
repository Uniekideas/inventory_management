import React from "react";
import "./Header.css";

function TitleHeader({text, headerTextStyle}) {
  return (
    <div>
      <h1 className={`titleHeaderText  ${headerTextStyle}`}>{text}</h1>
    </div>
  );
}

export default TitleHeader;
