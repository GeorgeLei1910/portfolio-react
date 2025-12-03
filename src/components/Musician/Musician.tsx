import React, { FC, useState, useEffect } from 'react';
import './Musician.module.css';
import BioSection from '../Bio/Bio';
import musicianImage from '../../img/MusicianBoi4MP.jpg';
import type { BioProps } from '../Bio/Bio';
import Menu from '../Menu/Menu';
import TimelineSection from '../Timeline/Timeline';
import PortfolioSection from '../Portfolio/Portfolio';
import { fetchSkills, fetchBio, fetchProjects, fetchTimeline} from '../../services/api';
import type { Project, Skills, Timeline } from '../../services/api'
import SkillsSection from '../Skills/Skills';
interface MusicianProps {
  bio?: BioProps;
}

const Musician: FC<MusicianProps> = () => {
  const [bio, setBio] = useState<BioProps>({
    className: 'programmer',
    image: musicianImage,
    blurb: "Loading..."
  });
  const [timelineData, setTimelineData] = useState<Timeline[]>([]);
  const [portfolioData, setPortfolioData] = useState<Project[]>([]);
  const [skillsData, setSkillsData] = useState<Skills[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bioData, timeline, projects, skills] = await Promise.all([
          fetchBio('programmer'),
          fetchTimeline('programmer'),
          fetchProjects('programmer'),
          fetchSkills('programmer'),
        ]);
        
        setBio({
          className: 'programmer',
          image: musicianImage,
          blurb: bioData.blurb
        });
        setTimelineData(timeline);
        setPortfolioData(projects);
        setSkillsData(skills);
      } catch (error) {
        console.error('Failed to load data:', error);
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
      <BioSection {...bio} />
      <SkillsSection data={skillsData}></SkillsSection>
      <TimelineSection data={timelineData} className="musician" />
      <PortfolioSection data={portfolioData} className="musician" />
    </div>
  );
};

export default Musician;
