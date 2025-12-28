import React, { FC } from "react";
import styles from "./Portfolio.module.css";
import PortfolioEntry from "../PortfolioEntry/PortfolioEntry";
import { Project } from "../../services/api";

interface PortfolioProps {
  data: Project[];
  className?: string;
}

const PortfolioSection: FC<PortfolioProps> = ({ data, className }) => (
  <div className={`${styles.Portfolio} ${className}`} id="portfolio">
    <h2>Projects I am proud of</h2>
    <div className={styles.container}>
    {data.map((entry) => (
      <PortfolioEntry key={entry.id} project={entry} />
    ))}
     </div>
  </div>
);

export default PortfolioSection;
