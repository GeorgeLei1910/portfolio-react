import React, { FC } from "react";
import styles from "./MiniSkillsEntry.module.css";
import { MiniSkills } from "@shared/types";

interface MiniSkillsEntryProps {
  items: MiniSkills[];
}

const MiniSkillsEntry: FC<MiniSkillsEntryProps> = ( {items} ) => (
  <div className={styles.MiniSkillsEntry}>
    {items.map((item) => (
      <div className={styles.skillsItem} data-testid="MiniSkillsEntry">
        <img
          src={item.imageUrl}
          alt={item.type}
          className={styles.skillImage}
        />
        <span className={styles.skillTooltip}>{item.type}</span>
      </div>
    ))}
  </div>
);

export default MiniSkillsEntry;
