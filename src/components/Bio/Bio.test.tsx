import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BioSection from './Bio';
import { Bio } from '../../services/api';

describe('<Bio />', () => {
  test('it should mount', () => {
    // Provide a minimal valid Bio object instead of undefined.
    const mockBio : Bio = {
      id: 1,
      type: 'staff',
      blurb: 'Experienced developer with a focus on web applications.',
      imagePath: '/images/john-doe.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    render(<BioSection data={mockBio} className="" />);

    const bio = screen.getByTestId('Bio');
    expect(bio).toBeInTheDocument();
  });
});