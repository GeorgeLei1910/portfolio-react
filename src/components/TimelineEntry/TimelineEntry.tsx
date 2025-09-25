import React, { FC } from 'react';
import styles from './TimelineEntry.module.css';

interface TimelineEntryProps {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const TimelineEntry: FC<TimelineEntryProps> = ({ year, title, description, imageUrl }) => (
  <div className={`${styles.TimelineEntry} programmer`} data-testid="TimelineEntry">
    <h2>{year}</h2>
    <h3>{title}</h3>
    <p>{description}</p>
    {imageUrl && <img src={imageUrl} alt={title} />}
  </div>
);

export default TimelineEntry;
