import React, { FC } from 'react';
import styles from './SkillsEntry.module.css';
import { Skills } from '../../services/api';

interface SkillsEntryProps {
  skill: Skills;
}

const SkillsEntry: FC<SkillsEntryProps> = ({ skill }) => (
  <div className={styles.SkillsEntry} data-testid="SkillsEntry">
    <h3>{skill.title}</h3>
    {skill.imageUrl && <img src={skill.imageUrl} alt={skill.title} />}
    <h3>{skill.description}</h3>
  </div>
);

export default SkillsEntry;
