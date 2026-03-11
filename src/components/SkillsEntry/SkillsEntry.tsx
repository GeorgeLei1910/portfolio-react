import React, { FC } from 'react';
import styles from './SkillsEntry.module.css';
import { Skills } from '../../services/api';

interface SkillsEntryProps {
  skill: Skills;
}

const thisYear = new Date().getFullYear();

const SkillsEntry: FC<SkillsEntryProps> = ({ skill }) => (
  <div className={styles.SkillsEntry} data-testid="SkillsEntry">
    <img src={skill.imageUrl} alt={skill.skill} />
    <h3 className={styles.skillText}>{skill.skill}</h3>
  </div>
);

export default SkillsEntry;
