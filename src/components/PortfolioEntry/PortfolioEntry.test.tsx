import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioEntry from './PortfolioEntry';

describe('<PortfolioEntry />', () => {
  test('it should mount', () => {
    render(<PortfolioEntry />);

    const portfolioEntry = screen.getByTestId('PortfolioEntry');

    expect(portfolioEntry).toBeInTheDocument();
  });
});