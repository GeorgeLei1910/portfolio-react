import React, { FC } from 'react';
import styles from './Skills.module.css';
import SkillsEntry from '../SkillsEntry/SkillsEntry';
import type { Skills } from '../../services/api';

type SkillsProps = {
  data: Skills[];
  className?: string;
};

const SkillsSection: FC<SkillsProps> = ({ data , className }) => (
  <div className={`${styles.Skills} ${className ?? ''}`} id="skills">
    <div className={styles.title}><h2>Skills</h2></div>
    {data.map((entry) => (
      <SkillsEntry skill={entry} />
    ))}
  </div>
);

export default SkillsSection;
