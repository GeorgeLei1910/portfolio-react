import React, { FC } from 'react';
import styles from './Programmer.module.css';
import Bio from '../Bio/Bio';
import programmerImage from '../../img/CSBoi4MP.jpg';

// Import BioProps interface from the Bio component
import type { BioProps } from '../Bio/Bio';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Timeline from '../Timeline/Timeline';


interface ProgrammerProps {}

const data: BioProps = {
  className: 'programmer',
  image: programmerImage,
  blurb: "Born in Hong Kong, raised in the nearby Macau, George Lei started programming with Scratch when he was 10 and then moved onto HTML/CSS at 12. At the age of 15, he learned C++ and made a simple buzzwire game. He always has an interest in creating programs. Now, he is a graduate from the University of British Columbia Major in Computer Science and Minor in Music Technology."
};

const Programmer: FC<ProgrammerProps> = () => (
  <div data-testid="Programmer">
    <Menu />
    <Bio {...data} />
    <Timeline data={[
    {
        "year": "2008",
        "title": "Started Programming",
        "description": "Started programming with Scratch.",
        "imageUrl": "https://example.com/scratch.png",
    },
    {
        "year": "2010",
        "title": "Learned HTML/CSS",
        "description": "Moved onto web development with HTML and CSS.",
        "imageUrl": "https://example.com/htmlcss.png"
    }
]} />
  </div>
);

export default Programmer;
