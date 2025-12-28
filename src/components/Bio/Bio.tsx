import React, { FC } from "react";
import styles from "./Bio.module.css";
import { Bio } from "../../services/api";

export interface BioProps {
  data?: Bio;
  className: string;
}

const BioSection: FC<BioProps> = ({data, className}) => (
  <div className={`${styles.bio} ${className}`} id="profile">
    <div className="profile">
      <img src={data?.imagePath} alt="me" className={styles.profile} id="george" />
    </div>
    <div className={styles.text_column}>
      <p>{data?.blurb}</p>
    </div>
  </div>
);

export default BioSection;
