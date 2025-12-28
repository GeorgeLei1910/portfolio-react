import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioEntry from './PortfolioEntry';
import { Project } from '../../services/api';

describe('<PortfolioEntry />', () => {
  test('it should mount', () => {
    const mockProject : Project = {
      id: 0,
      type: '',
      year: '',
      title: '',
      description: '',
      imageUrl: '',
      skills: [],
      url: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    render(
      <PortfolioEntry
        project={mockProject}
      />
    );

    const portfolioEntry = screen.getByTestId('PortfolioEntry');

    expect(portfolioEntry).toBeInTheDocument();
  });
});