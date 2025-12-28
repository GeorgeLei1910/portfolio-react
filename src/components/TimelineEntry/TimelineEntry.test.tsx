import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Timeline } from '../../services/api';
import TimelineEntry from './TimelineEntry';

const entry: Timeline = {
  id: 1,
  type: 'event',
  year: "2022",
  createdAt: new Date(),
  skills: [],
  description: 'Test description',
  title: 'Test Title',
  imageUrl: 'https://example.com',
  updatedAt: new Date()
};

describe('<TimelineEntry />', () => {
  test('it should mount', () => {
    render(<TimelineEntry entry={entry} position='right'/>);

    const timelineEntry = screen.getByTestId('TimelineEntry');

    expect(timelineEntry).toBeInTheDocument();
  });
});