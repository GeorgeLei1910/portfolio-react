import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioEntry from './PortfolioEntry';

describe('<PortfolioEntry />', () => {
  test('it should mount', () => {
    render(<PortfolioEntry date="2025-01-01" title="Project 1" description="Description 1" photoUrl="https://example.com/photo1.jpg" url="https://example.com/project1" />);

    const portfolioEntry = screen.getByTestId('PortfolioEntry');

    expect(portfolioEntry).toBeInTheDocument();
  });
});