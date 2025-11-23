import React, { FC } from 'react';
import styles from './Skills.module.css';
import SkillsEntry from '../SkillsEntry/SkillsEntry';



interface SkillsProps {
    data: {
      title: string;
      experience: string;
      imageUrl: string;
    }[];
    className?: string;
}

const Skills: FC<SkillsProps> = ({ data, className }) => (
  <div className={`${styles.Skills} ${className}`} id ="skills">
    <div className={styles.title}><h2>Skills</h2></div>
    {data.map((entry) => (
      <SkillsEntry {...entry} />
    ))}
  </div>
);

export default Skills;
