import React, { FC, useState, useEffect } from 'react';
import './Musician.module.css';
import Bio from '../Bio/Bio';
import musicianImage from '../../img/MusicianBoi4MP.jpg';
import type { BioProps } from '../Bio/Bio';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Timeline from '../Timeline/Timeline';
import { fetchBio, fetchTimeline } from '../../services/api';
import Portfolio from '../Portfolio/Portfolio';
interface MusicianProps {
  bio?: BioProps;
}

interface TimelineDataItem {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  position?: 'left' | 'right';
}

interface PortfolioDataItem {
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  url: string;
}

const Musician: FC<MusicianProps> = () => {
  const [bio, setBio] = useState<BioProps>({
    className: 'musician',
    image: musicianImage,
    blurb: "Loading..."
  });
  const [timelineData, setTimelineData] = useState<TimelineDataItem[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bioData, timeline] = await Promise.all([
          fetchBio('musician'),
          fetchTimeline('musician')
        ]);
        
        setBio({
          className: 'musician',
          image: musicianImage,
          blurb: bioData.blurb
        });
        
        setTimelineData(timeline.map((entry: any) => ({
          year: entry.year,
          title: entry.title,
          description: entry.description,
          imageUrl: entry.image_url
        })));
      } catch (error) {
        console.error('Failed to load data:', error);
        // Fallback to hardcoded data
        setBio({
          className: 'musician',
          image: musicianImage,
          blurb: "Born in Hong Kong, raised in the nearby Macau."
          + " George Lei has experience with many instruments."
          + " He first played the piano when he was 5. He then picked the bass up when he was 10."
          + " During middle school and high school, he started playing bass for different bands."
          + " Also during that time, he has developed an interest for different instruments."
          + " He is a graduate of the University of British Columbia in Computer Science and minored in Music Technology."
        });
        setTimelineData([
          {
            "year": "2008",
            "title": "Started Playing Piano",
            "description": "Started playing the piano.",
            "imageUrl": "https://example.com/piano.png",
          },
          {
            "year": "2010",
            "title": "Learned HTML/CSS",
            "description": "Moved onto web development with HTML and CSS.",
            "imageUrl": "https://example.com/htmlcss.png"
          }
        ]);
        setPortfolioData([
          {
            "date": "2025-01-01",
            "title": "Project 1",
            "description": "Description 1",
            "photoUrl": "https://example.com/photo1.jpg",
            "url": "https://example.com/project1"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div data-testid="Musician">Loading...</div>;
  }

  return (
    <div data-testid="Musician">
      <Menu />
      <Bio {...bio} />
      <Timeline data={timelineData} className="musician" />
      <Portfolio data={portfolioData} className="musician" />
    </div>
  );
};

export default Musician;
