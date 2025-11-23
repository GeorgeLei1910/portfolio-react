import React, { FC } from 'react';
import styles from './PortfolioEntry.module.css';

interface PortfolioEntryProps {
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  url: string;
}

const PortfolioEntry: FC<PortfolioEntryProps> = ({ date, title, description, photoUrl, url }) => (
  <div className={styles.PortfolioEntry} data-testid="PortfolioEntry">
    <a href={url}><img src={photoUrl} alt="" height="200px" className="cards" /></a>
    <h4>{title}</h4>
    <p className="text_column">{description}</p>
  </div>
);

export default PortfolioEntry;
