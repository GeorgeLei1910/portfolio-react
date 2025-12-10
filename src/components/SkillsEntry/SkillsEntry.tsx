import React, { FC } from 'react';
import styles from './SkillsEntry.module.css';
import { Skills } from '../../services/api';

interface SkillsEntryProps {
  skill: Skills;
}

const thisYear = new Date().getFullYear();

const SkillsEntry: FC<SkillsEntryProps> = ({ skill }) => (
  <div className={styles.SkillsEntry} data-testid="SkillsEntry">
    <h3 className={styles.skillText}>{skill.skill}<br/> {`${thisYear - skill.experience} years`}</h3>
    <img src={skill.imageUrl} alt={skill.skill} />
  </div>
);

export default SkillsEntry;
