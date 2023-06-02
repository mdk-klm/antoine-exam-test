import React from 'react';
import { render } from '@testing-library/react';
import NoteList from './NoteList';

describe('NoteList', () => {
  const mockRates = [
    {
      id: 1,
      title: 'Note 1',
      note: 7,
      commentary: 'Commentary 1',
    },
    {
      id: 2,
      title: 'Note 2',
      note: 9,
      commentary: 'Commentary 2',
    },
  ];

  it('affiche la bonne couleur selon la couleur', () => {
    const { getAllByTestId } = render(
      <NoteList rates={mockRates} handleEdit={() => {}} dispatch={() => {}} />
    );

    const noteItems = getAllByTestId('note-item');

    noteItems.forEach((item, index) => {
      const backgroundColor = item.style.backgroundColor;

      if (mockRates[index].note < 8) {
        expect(backgroundColor).toBe('red');
      } else if (mockRates[index].note < 10) {
        expect(backgroundColor).toBe('orange');
      } else if (mockRates[index].note < 13) {
        expect(backgroundColor).toBe('yellow');
      } else {
        expect(backgroundColor).toBe('green');
      }
    });
  });
});
