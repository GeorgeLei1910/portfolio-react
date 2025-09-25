import React, { FC } from 'react';
import styles from './Timeline.module.css';
import TimelineEntry from '../TimelineEntry/TimelineEntry';

interface TimelineProps {}

const Timeline: FC<TimelineProps> = () => (
  <div className={styles.Timeline} data-testid="Timeline">
    <div className={`${styles.line} programmer`}></div>
    <TimelineEntry year="2008" title="Started Programming" description="Started programming with Scratch." imageUrl="https://example.com/scratch.png" />
    <TimelineEntry year="2010" title="Learned HTML/CSS" description="Moved onto web development with HTML and CSS." imageUrl="https://example.com/htmlcss.png" />
  </div>
);

export default Timeline;
