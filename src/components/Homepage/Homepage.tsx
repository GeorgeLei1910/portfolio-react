import React, { FC } from "react";
import styles from "./Homepage.module.css";

interface HomepageProps {}

const Homepage: FC<HomepageProps> = ( ) => (
  <div className="homepage" data-testid="Homepage">
    <h1 className={styles.text}> GEORGE LEI </h1>
    <section className={styles.menu}>
      <a href="/programmer" className={`${styles.bigbutton} ${styles.green}`}>
        <div> PROGRAMMER </div>
      </a>
      <a href="/musician" className={`${styles.bigbutton} ${styles.purple}`}>
        <div> MUSICIAN </div>
      </a>
    </section>
  </div>
);

export default Homepage;
