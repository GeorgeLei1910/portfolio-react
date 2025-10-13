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
}

const Timeline: FC<TimelineProps> = ({ data }) => (
  <div className={styles.timeline} data-testid="Timeline">
    <h2>Timeline</h2>
    {data.map((entry, index) => {
      entry.position = entry.position ?? (index % 2 === 0 ? 'left' : 'right');
      return <TimelineEntry {...entry} key={index} />;
    })}
  </div>
);

export default Timeline;
