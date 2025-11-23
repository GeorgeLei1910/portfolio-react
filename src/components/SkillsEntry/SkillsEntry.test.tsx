import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsEntry from './SkillsEntry';

describe('<SkillsEntry />', () => {
  test('it should mount', () => {
    render(<SkillsEntry title={''} experience={''} imageUrl={''} />);

    const skillsEntry = screen.getByTestId('SkillsEntry');

    expect(skillsEntry).toBeInTheDocument();
  });
});