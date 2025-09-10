import React, { FC } from "react";
import styles from "./Menu.module.css";

interface MenuProps {}

const Menu: FC<MenuProps> = () => (
  <div data-testid="Menu">
    <a href="/"><h1>George Lei</h1></a>
    <menu>
      <a href="#profile">
        <button className={styles.button}>Profile</button>
      </a>
      <a href="#curvit">
        <button className={styles.button}>Experience Q&A</button>
      </a>
      <a href="#portfolio">
        <button className={styles.button}>Portfolio</button>
      </a>
      <a href="#contact">
        <button className={styles.button}>Contact</button>
      </a>
    </menu>
  </div>
);

export default Menu;
