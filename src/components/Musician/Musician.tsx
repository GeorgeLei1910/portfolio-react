import React, { FC } from 'react';
import './Musician.module.css';
import Bio from '../Bio/Bio';
import musicianImage from '../../img/MusicianBoi4MP.jpg';
import type { BioProps } from '../Bio/Bio';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';

interface MusicianProps {
  bio ?: BioProps;
}

const data: BioProps = {
  className: 'musician',
  image: musicianImage,
  blurb: "Born in Hong Kong, raised in the nearby Macau."
  + " George Lei has experience with many instruments."
  + " He first played the piano when he was 5. He then picked the bass up when he was 10."
  + " During middle school and high school, he started playing bass for different bands."
  + " Also during that time, he has developed an interest for different instruments."
  + " He is a graduate of the University of British Columbia in Computer Science and minored in Music Technology."
};

const Musician: FC<MusicianProps> = () => (
  <div data-testid="Musician" className='musician'>
    <Menu />
    <Bio {...data} />
    <Footer />
  </div>
);

export default Musician;
