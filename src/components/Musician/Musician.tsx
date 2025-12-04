import React, { FC, useState, useEffect } from 'react';
import './Musician.module.css';
import BioSection from '../Bio/Bio';
import type { BioProps } from '../Bio/Bio';
import Menu from '../Menu/Menu';
import TimelineSection from '../Timeline/Timeline';
import PortfolioSection from '../Portfolio/Portfolio';
import { fetchSkills, fetchBio, fetchProjects, fetchTimeline} from '../../services/api';
import type { Bio, Project, Skills, Timeline } from '../../services/api'
import SkillsSection from '../Skills/Skills';
interface MusicianProps {
  bio?: BioProps;
}

const Musician: FC<MusicianProps> = () => {
  const [bio, setBio] = useState<Bio>();
  const [timelineData, setTimelineData] = useState<Timeline[]>([]);
  const [portfolioData, setPortfolioData] = useState<Project[]>([]);
  const [skillsData, setSkillsData] = useState<Skills[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bioData, timeline, projects, skills] = await Promise.all([
          fetchBio('musician'),
          fetchTimeline('musician'),
          fetchProjects('musician'),
          fetchSkills('musician'),
        ]);
        
        setBio(bioData);
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
      <BioSection data={bio} className='musician' />
      <SkillsSection data={skillsData} className='musician'/>
      <TimelineSection data={timelineData} className="musician" />
      <PortfolioSection data={portfolioData} className="musician" />
    </div>
  );
};

export default Musician;
