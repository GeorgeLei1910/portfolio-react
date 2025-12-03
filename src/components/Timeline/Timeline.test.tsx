import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelineSection from './Timeline';

describe('<Timeline />', () => {
  test('it should mount', () => {
    render(<TimelineSection data={[]} />);

    const timeline = screen.getByTestId('Timeline');

    expect(timeline).toBeInTheDocument();
  });
});