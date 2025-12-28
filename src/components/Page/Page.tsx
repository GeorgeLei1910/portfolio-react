import React, { FC, useState, useEffect } from 'react';
import BioSection from '../Bio/Bio';
import Menu from '../Menu/Menu';
import TimelineSection from '../Timeline/Timeline';
import { fetchBio, fetchProjects, fetchSkills, fetchTimeline} from '../../services/api';
import type {Bio, Project, Skills, Timeline} from '../../services/api';
import PortfolioSection from '../Portfolio/Portfolio';
import SkillsSection from '../Skills/Skills';
import ReturnToTop from '../ReturnToTop/ReturnToTop';


interface PageProps {
  occupation : string
}

const Page: FC<PageProps> = ({ occupation }) => {
  const [bio, setBio] = useState<Bio>();
  const [timelineData, setTimelineData] = useState<Timeline[]>([]);
  const [portfolioData, setPortfolioData] = useState<Project[]>([]);
  const [skillsData, setSkillsData] = useState<Map<string, Skills[]>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bioData, timeline, projects, skills] = await Promise.all([
          fetchBio(occupation),
          fetchTimeline(occupation),
          fetchProjects(occupation),
          fetchSkills(occupation),
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
    return <div data-testid={occupation}>Loading...</div>;
  }

  return (
    <div data-testid={occupation}>
      <Menu />
      { bio && <BioSection data={bio} className={occupation} />}
      { skillsData && <SkillsSection data={skillsData} className={occupation} />}
      { timelineData && <TimelineSection data={timelineData} className={occupation}/>}
      { portfolioData && <PortfolioSection data={portfolioData} className={occupation} />}
      <ReturnToTop type={occupation}/>
    </div>
  );
};

export default Page;
