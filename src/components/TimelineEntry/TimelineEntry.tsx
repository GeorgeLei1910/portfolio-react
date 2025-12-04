import React, { FC } from "react";
import styles from "./TimelineEntry.module.css";
import { Timeline } from "../../services/api";

interface TimelineEntryProps {
  entry : Timeline;
  position: "left" | "right";
}

const TimelineEntry: FC<TimelineEntryProps> = ({
  entry, position
}) => (
  <div
    className={`${styles.container} ${styles[position!]}`}
    data-testid="TimelineEntry"
  >
    <h2 className="date">{entry.year}</h2>
    <div className="content">
      <h3>{entry.title}</h3>
      <p>{entry.description}</p>
    </div>
  </div>
);

export default TimelineEntry;
