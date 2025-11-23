import React, { FC } from "react";
import styles from "./Portfolio.module.css";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";


interface PortfolioProps {
  data: {
    date: string;
    title: string;
    description: string;
    photoUrl: string;
    url: string;
  }[];
  className?: string;
}

const Portfolio: FC<PortfolioProps> = ({ data, className }) => (
  <div className={`${styles.Portfolio} ${className}`} id = "portfolio">
    <h2>Projects I am proud of</h2>
    {data.map((entry, index) => {
      return <PortfolioEntry {...entry} key={index} />;
    })}
  </div>
);

export default Portfolio;
