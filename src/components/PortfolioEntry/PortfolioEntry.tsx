import React, { FC } from 'react';
import styles from './PortfolioEntry.module.css';
import { Project } from '../../services/api';

interface PortfolioEntryProps {
  project: Project;
}

const PortfolioEntry: FC<PortfolioEntryProps> = ({ project }) => (
  <div className={styles.PortfolioEntry} data-testid="PortfolioEntry">
    <a href={project.url}><img src={project.imageUrl} alt="" height="200px" className="cards" /></a>
    <h4>{project.title}</h4>
    <p className="text_column">{project.description}</p>
  </div>
);

export default PortfolioEntry;
