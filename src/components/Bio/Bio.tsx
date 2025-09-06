import React, { FC } from 'react';
import styles from './Bio.module.css';

export interface BioProps {
  image: string;
  blurb: string;
}

const Bio: FC<BioProps> = ({ image, blurb }) => (
  <div className={styles.Bio} data-testid="Bio">
      <section className="intro">
    <div className="picture_column">
      <img src={image} alt="me" className="profile" id="george" />
  </div>
    <div className="text_column">
    <br /><br />
    <p>{blurb}</p>
    </div>
  </section>
  </div>
);

export default Bio;
