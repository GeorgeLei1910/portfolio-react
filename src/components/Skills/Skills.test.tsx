import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsSection from './Skills';

describe('<Skills />', () => {
  test('it should mount', () => {
    render(<SkillsSection data={[]} />);

    const skills = screen.getByTestId('Skills');

    expect(skills).toBeInTheDocument();
  });
});