import React from "react";
import "./InfoCard.scss";
import type { BookStatus } from "../Header/Header";

interface InfoCardProps {
  statusData: BookStatus[];
}

const InfoCard: React.FC<InfoCardProps> = ({ statusData }) => {
  return (
    <div className="infocard-container">
      {statusData.map((item, index) => (
        <div key={index} className="infocard-bg">
          <p className="infocard-text">{item.text}</p>
          <p className="infocard-value">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
