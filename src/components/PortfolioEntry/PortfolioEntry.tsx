import React, { FC } from 'react';
import styles from './PortfolioEntry.module.css';
import { Project } from '../../services/api';
import MiniSkillsEntry from '../MiniSkillsEntry/MiniSkillsEntry';

interface PortfolioEntryProps {
  project: Project;
}

const PortfolioEntry: FC<PortfolioEntryProps> = ({ project }) => (
  <div className={styles.PortfolioEntry} data-testid="PortfolioEntry">
    {project.embeddable ? 
      (<div 
        className={styles.embedded}
        dangerouslySetInnerHTML={{ __html: project.embeddable }}
      />)
    : (<a href={project.url}><img src={project.imageUrl} alt="" className="cards" /></a>)}
    <h4>{project.title}</h4>
    <p className="text_column">{project.description}</p>
    {project.skills && project.skills.length > 0 && <div className={styles.skills}><MiniSkillsEntry items={project.skills}/></div>}
  </div>
);

export default PortfolioEntry;
