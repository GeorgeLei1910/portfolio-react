import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelineEntry from './TimelineEntry';

describe('<TimelineEntry />', () => {
  test('it should mount', () => {
    render(<TimelineEntry year="2008" title="Started Programming" description="Started programming with Scratch." imageUrl="https://example.com/scratch.png" />);

    const timelineEntry = screen.getByTestId('TimelineEntry');

    expect(timelineEntry).toBeInTheDocument();
  });
});