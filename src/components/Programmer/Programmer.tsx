import React, { FC, useState, useEffect } from 'react';
import styles from './Programmer.module.css';
import BioSection from '../Bio/Bio';
import Menu from '../Menu/Menu';
import TimelineSection from '../Timeline/Timeline';
import { fetchBio, fetchProjects, fetchSkills, fetchTimeline} from '../../services/api';
import type {Bio, Project, Skills, Timeline} from '../../services/api';
import PortfolioSection from '../Portfolio/Portfolio';
import SkillsSection from '../Skills/Skills';


interface ProgrammerProps {}

const Programmer: FC<ProgrammerProps> = () => {
  const [bio, setBio] = useState<Bio>();
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
    return <div data-testid="Programmer">Loading...</div>;
  }

  return (
    <div data-testid="Programmer">
      <Menu />
      <BioSection data={bio} className='programmer' />
      <SkillsSection data={skillsData} className="programmer" />
      <TimelineSection data={timelineData} className="programmer" />
      <PortfolioSection data={portfolioData} className="programmer" />
    </div>
  );
};

export default Programmer;
