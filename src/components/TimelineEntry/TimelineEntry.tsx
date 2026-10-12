import React, { FC } from "react";
import styles from "./TimelineEntry.module.css";
import { Timeline } from "../../services/api";
import MiniSkillsEntry from "../MiniSkillsEntry/MiniSkillsEntry";

interface TimelineEntryProps {
  entry: Timeline;
  position: "left" | "right";
}

const formatDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
  
  return `${year} ${month}`;
};

const TimelineEntry: FC<TimelineEntryProps> = ({ entry, position }) => (
  <div
    className={`${styles.container} ${styles[position!]}`}
    data-testid="TimelineEntry"
  >
    {entry.imageUrl && (
      <div className={styles.dotImage}>
      <img 
        src={entry.imageUrl} 
        alt={entry.title}
      /></div>
    )}
    <h2 className="date">{entry.title}</h2>
    <div className="content">
      <h3>{entry.company}</h3>
      <h4>{entry.date ? formatDate(entry.date) : null}</h4>
      <p>{entry.description}</p>
      {entry.skills && entry.skills.length > 0 && (
        <MiniSkillsEntry items={entry.skills} />
      )}
    </div>
  </div>
);

export default TimelineEntry;
