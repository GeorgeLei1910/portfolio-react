import React, { FC } from 'react';
import styles from './PortfolioEntry.module.css';

interface PortfolioEntryProps {}

const PortfolioEntry: FC<PortfolioEntryProps> = () => (
  <div className={styles.PortfolioEntry} data-testid="PortfolioEntry">
    PortfolioEntry Component
  </div>
);

export default PortfolioEntry;
