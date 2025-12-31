import React, { FC } from "react";
import styles from "./Menu.module.css";

interface MenuProps {}

const Menu: FC<MenuProps> = () => {

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (<div data-testid="Menu" className={styles.menu}>
    <a href="/"><h1>GEORGE LEI</h1></a>
    <menu>
      <a href="#profile"
      onClick={(e) => handleAnchorClick(e, '#profile')}>
        <button className={styles.button}>Profile</button>
      </a>
      <a href="#skills"
      onClick={(e) => handleAnchorClick(e, '#skills')}>
        <button className={styles.button}>Skills</button>
      </a>
      <a href="#timeline"
      onClick={(e) => handleAnchorClick(e, '#timeline')}>
        <button className={styles.button}>Timeline</button>
      </a>
      <a href="#portfolio"
      onClick={(e) => handleAnchorClick(e, '#portfolio')}>
        <button className={styles.button}>Portfolio</button>
      </a>
      <a href="#contact"
      onClick={(e) => handleAnchorClick(e, '#contact')}>
        <button className={styles.button}>Contact</button>
      </a>
    </menu>
  </div>);
};

export default Menu;
