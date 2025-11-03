import React, { FC, useState, useEffect } from 'react';
import styles from './Programmer.module.css';
import Bio from '../Bio/Bio';
import programmerImage from '../../img/CSBoi4MP.jpg';

// Import BioProps interface from the Bio component
import type { BioProps } from '../Bio/Bio';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Timeline from '../Timeline/Timeline';
import { fetchBio, fetchTimeline } from '../../services/api';


interface ProgrammerProps {}

interface TimelineDataItem {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  position?: 'left' | 'right';
}

const Programmer: FC<ProgrammerProps> = () => {
  const [bio, setBio] = useState<BioProps>({
    className: 'programmer',
    image: programmerImage,
    blurb: "Loading..."
  });
  const [timelineData, setTimelineData] = useState<TimelineDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bioData, timeline] = await Promise.all([
          fetchBio('programmer'),
          fetchTimeline('programmer')
        ]);
        
        setBio({
          className: 'programmer',
          image: programmerImage,
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
          className: 'programmer',
          image: programmerImage,
          blurb: "Born in Hong Kong, raised in the nearby Macau, George Lei started programming with Scratch when he was 10 and then moved onto HTML/CSS at 12. At the age of 15, he learned C++ and made a simple buzzwire game. He always has an interest in creating programs. Now, he is a graduate from the University of British Columbia Major in Computer Science and Minor in Music Technology."
        });
        setTimelineData([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div data-testid="Programmer">Loading...</div>;
  }

  return (
    <div data-testid="Programmer">
      <Menu />
      <Bio {...bio} />
      <Timeline data={timelineData} className="programmer" />
    </div>
  );
};

export default Programmer;
