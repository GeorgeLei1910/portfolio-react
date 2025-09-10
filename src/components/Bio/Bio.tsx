import React, { FC } from 'react';
import './Bio.module.css';

export interface BioProps {
  image: string;
  blurb: string;
}

const Bio: FC<BioProps> = ({ image, blurb }) => (
  <div className="bio" data-testid="Bio">
      <section className="intro">
    <div className="picture_column">
      <img src={image} alt="me" className="profile" id="george" />
  </div>
    <div className="text_column">
    <p>{blurb}</p>
    </div>
  </section>
  </div>
);

export default Bio;
