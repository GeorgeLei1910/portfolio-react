import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioSection from './Portfolio';
import { Project } from '../../services/api';

const pf : Project = {
  id: 0,
  type: '',
  year: '',
  title: '',
  description: '',
  imageUrl: '',
  url: undefined,
  createdAt: undefined,
  updatedAt: undefined
}

describe('<Portfolio />', () => {
  test('it should mount', () => {
    render(<PortfolioSection data={[pf]} className="programmer" />);

    const portfolio = screen.getByTestId('Portfolio');

    expect(portfolio).toBeInTheDocument();
  });
});