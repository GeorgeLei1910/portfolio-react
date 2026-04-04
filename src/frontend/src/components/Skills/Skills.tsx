import React, { FC } from 'react';
import styles from './Skills.module.css';
import SkillsEntry from '../SkillsEntry/SkillsEntry';
import type { Skills } from '../../services/api';

type SkillsProps = {
  data: Map<string, Skills[]>;
  className?: string;
};

const SkillsSection: FC<SkillsProps> = ({ data , className }) => (
  <div className={`${styles.Skills} ${className ?? ''}`} id="skills">
    <div className={styles.title}><h2>Skills</h2></div>
    <div className={styles.container}>
      {Object.entries(data).map(([subtype, skills]) => (
        <div key={subtype} className={styles.category}>
          <h3 className={styles.categoryTitle}>{subtype}</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill: Skills) => (
              <SkillsEntry key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkillsSection;
