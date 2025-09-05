import React, { FC } from "react";
import "./Homepage.css";

import LinkedIn from '../../img/LI-In-Bug.png';
import GitHub from '../../img/GitHub-Mark-120px-plus.png';
import EmailIcon from '../../img/email-icon-jpg-3.jpg';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => (
  <div>
    <h1 className="text"> GEORGE LEI </h1>
    <section className="menu">
      <a href="/programmer" className="bigbutton green">
        <div> PROGRAMMER </div>
      </a>
      <a href="/musician" className="bigbutton purple">
        <div> MUSICIAN </div>
      </a>
    </section>
    <section className="submenu">
      <a
        href="https://www.linkedin.com/in/george-lei-3a1328141"
        target="_blank"
      >
        <div className="non-button">
          <img className="shift greyscale" src={LinkedIn} />
        </div>
      </a>
      <a href="https://github.com/GeorgeLei1910" target="_blank">
        <div className="non-button">
          <img className="shift togrey" src={GitHub} />
        </div>
      </a>
      <a href="mailto:georgecklei@gmail.com" target="_blank">
        <div className="non-button">
          <img className="shift togrey" src={EmailIcon} />
        </div>
      </a>
    </section>
  </div>
);

export default Homepage;
