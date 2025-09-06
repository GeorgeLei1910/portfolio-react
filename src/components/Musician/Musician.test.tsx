import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Musician from './Musician';

describe('<Musician />', () => {
  test('it should mount', () => {
    render(<Musician />);

    const musician = screen.getByTestId('Musician');

    expect(musician).toBeInTheDocument();
  });
});