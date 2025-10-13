import React, { FC } from "react";
import styles from "./TimelineEntry.module.css";

interface TimelineEntryProps {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  position?: "left" | "right";
}

const TimelineEntry: FC<TimelineEntryProps> = ({
  year,
  title,
  description,
  imageUrl,
  position
}) => (
  <div
    className={`${styles.container} ${styles[position!]}`}
    data-testid="TimelineEntry"
  >
    <h2 className="date">{year}</h2>
    <div className="content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default TimelineEntry;
