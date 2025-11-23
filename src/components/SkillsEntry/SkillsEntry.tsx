import React, { FC } from 'react';
import styles from './SkillsEntry.module.css';

interface SkillsEntryProps {
  title: string;
  experience: string;
  imageUrl: string;
}

const SkillsEntry: FC<SkillsEntryProps> = (object: SkillsEntryProps) => (
  <div className={styles.SkillsEntry} data-testid="SkillsEntry">
    <h3>{object.title}</h3>
    { (object.imageUrl) && <img src={object.imageUrl} alt={object.title} />}
    <h3>{object.experience}</h3>
  </div>
);

export default SkillsEntry;
