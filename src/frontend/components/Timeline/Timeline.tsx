import React, { FC } from 'react';
import styles from './Timeline.module.css';
import TimelineEntry from '../TimelineEntry/TimelineEntry';
import { Timeline } from '../../services/api';

interface TimelineProps {
  data: Timeline[];
  className?: string;
}

const TimelineSection: FC<TimelineProps> = ({ data, className }) => (
  <div className={`${styles.timeline} ${className}`} id="timeline">
    <div className={styles.title}><h2>Timeline</h2></div>
    {data.map((entry, index) => {
      const position = index % 2 == 0 ? 'left' : 'right';
      return <TimelineEntry entry={entry} position={position} />;
    })}
  </div>
);

export default TimelineSection;
