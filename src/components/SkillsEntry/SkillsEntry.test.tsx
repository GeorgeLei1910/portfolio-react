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
          title: 'JavaScript',
          year: '2022',
          imageUrl: 'https://example.com/js.png',
          type: 'Programming',
          description: 'A programming language.',
          createdAt: new Date(),
          updatedAt: new Date()
        }}
      />
    );

    const skillsEntry = screen.getByTestId('SkillsEntry');

    expect(skillsEntry).toBeInTheDocument();
  });
});