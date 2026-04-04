import React, { FC } from "react";

import styles from "./Footer.module.css";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer id="contact">
      <p className={styles.hero_header}>WANT MORE INFO ABOUT ME?</p>
      <section className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/george-lei-3a1328141"
          rel="noreferrer"
          target="_blank"
        >
          <div className={styles.non_button}>
            <img
              className={`${styles.shift} ${styles.greyscale}`}
              alt="Go to my LinkedIn"
              src="/img/LI-In-Bug.png"
            />
          </div>
        </a>
        <a
          href="https://github.com/GeorgeLei1910"
          rel="noreferrer"
          target="_blank"
        >
          <div className={styles.non_button}>
            <img
              className={`${styles.shift} ${styles.togrey}`}
              alt="Look at my Github Projects"
              src="/img/GitHub-Mark-120px-plus.png"
            />
          </div>
        </a>
        <a href="mailto:georgecklei@gmail.com" rel="noreferrer" target="_blank">
          <div className={styles.non_button}>
            <img
              className={`${styles.shift} ${styles.togrey}`}
              alt="Email to Me"
              src="/img/email-icon-jpg-3.jpg"
            />
          </div>
        </a>
      </section>
      <p className={styles.copyright}>
        &copy;2026 - <strong>George C. K. lei</strong>
      </p>
    </footer>
  );
};

export default Footer;
