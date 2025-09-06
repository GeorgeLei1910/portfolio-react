import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bio from './Bio';

describe('<Bio />', () => {
  test('it should mount', () => {
    render(<Bio {...{ image: '', blurb: '' }} />);

    const bio = screen.getByTestId('Bio');

    expect(bio).toBeInTheDocument();
  });
});