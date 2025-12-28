import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsEntry from './SkillsEntry';

describe('<SkillsEntry />', () => {
  test('it should mount', () => {
    // Providing all required properties from the Skills type
    render(
      <SkillsEntry
        skill={{
          id: 1,
          skill: 'JavaScript',
          experience: 2022,
          imageUrl: 'https://example.com/js.png',
          type: 'Programming',
          subtype: 'Languages',
          createdAt: new Date(),
          updatedAt: new Date()
        }}
      />
    );

    const skillsEntry = screen.getByTestId('SkillsEntry');

    expect(skillsEntry).toBeInTheDocument();
  });
});