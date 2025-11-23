import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portfolio from './Portfolio';

describe('<Portfolio />', () => {
  test('it should mount', () => {
    render(<Portfolio data={[ { date: '2025-01-01', title: 'Project 1', description: 'Description 1', photoUrl: 'https://example.com/photo1.jpg', url: 'https://example.com/project1' } ]} className="programmer" />);

    const portfolio = screen.getByTestId('Portfolio');

    expect(portfolio).toBeInTheDocument();
  });
});