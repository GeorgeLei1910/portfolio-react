import React, { FC } from 'react';
import styles from './Timeline.module.css';
import TimelineEntry from '../TimelineEntry/TimelineEntry';

interface TimelineProps {
  data: {
    year: string;
    title: string;
    description: string;
    imageUrl: string;
    position?: 'left' | 'right';
  }[];
  className?: string;
}

const TimelineSection: FC<TimelineProps> = ({ data, className }) => (
  <div className={`${styles.timeline} ${className}`} id="timeline">
    <div className={styles.title}><h2>Timeline</h2></div>
    {data.map((entry, index) => {
      entry.position = entry.position ?? (index % 2 === 0 ? 'left' : 'right');
      return <TimelineEntry {...entry} key={index} />;
    })}
  </div>
);

export default TimelineSection;
