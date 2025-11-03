import React, { FC } from 'react';
import styles from './Skills.module.css';

interface SkillsProps {}

const Skills: FC<SkillsProps> = () => (
  <div className={styles.Skills} data-testid="Skills">
  </div>
);

export default Skills;
