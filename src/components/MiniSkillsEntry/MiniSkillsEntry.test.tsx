import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MiniSkillsEntry from './MiniSkillsEntry';
import { MiniSkills } from '@shared/types';

describe('<MiniSkillsEntry />', () => {
  test('it should mount', () => {
    // Provide required props for MiniSkills type
    const mockItem : MiniSkills = {
      id: 1,
      type: 'frontend',
      imageUrl: 'https://example.com/image.png'
    };
    // Fix: mockItem.id should be a number, not a string
    render(<MiniSkillsEntry items={ [mockItem] } />);

    const miniSkillsEntry = screen.getByTestId('MiniSkillsEntry');

    expect(miniSkillsEntry).toBeInTheDocument();
  });
});