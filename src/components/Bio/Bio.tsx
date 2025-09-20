import React, { FC } from "react";
import styles from "./Bio.module.css";

export interface BioProps {
  className?: string;
  image: string;
  blurb: string;
}

const Bio: FC<BioProps> = ({ image, blurb, className }) => (
  <div className={`${styles.bio} ${className}`} data-testid="Bio">
    <div className="profile">
      <img src={image} alt="me" className={styles.profile} id="george" />
    </div>
    <div className={styles.text_column}>
      <p>{blurb}</p>
    </div>
  </div>
);

export default Bio;
