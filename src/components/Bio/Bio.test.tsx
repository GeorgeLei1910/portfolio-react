import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BioSection from './Bio';

describe('<Bio />', () => {
  test('it should mount', () => {
    render(<BioSection {...{ image: '', blurb: '' }} />);

    const bio = screen.getByTestId('Bio');

    expect(bio).toBeInTheDocument();
  });
});