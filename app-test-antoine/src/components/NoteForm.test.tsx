import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NoteForm from './NoteForm';

describe('NoteForm', () => {
  it('submits the form with the correct values', () => {
    const mockDispatch = jest.fn();
    const mockToggleModal = jest.fn();

    render(
      <NoteForm
        dispatch={mockDispatch}
        dataToEdit={undefined}
        toggleModal={mockToggleModal}
      />
    );

    const titleInput = screen.getByLabelText('Titre');
    const noteInput = screen.getByLabelText('Note');
    const commentaryInput = screen.getByLabelText('Commentaire');
    const submitButton = screen.getByText('Ajouter note');

    const title = 'Sample Title';
    const note = '8';
    const commentary = 'Sample Commentary';

    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(noteInput, { target: { value: note } });
    fireEvent.change(commentaryInput, { target: { value: commentary } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_NOTE',
      payload: {
        id: expect.any(Number),
        title,
        note,
        commentary,
      },
    });

    expect(titleInput.value).toBe('');
    expect(noteInput.value).toBe('');
    expect(commentaryInput.value).toBe('');
    expect(mockToggleModal).toHaveBeenCalled();
  });

  it('displays an error message when fields are empty', () => {
    const mockDispatch = jest.fn();
    const mockToggleModal = jest.fn();

    render(
      <NoteForm
        dispatch={mockDispatch}
        dataToEdit={undefined}
        toggleModal={mockToggleModal}
      />
    );

    const submitButton = screen.getByText('Ajouter note');

    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(screen.getByText('All the fields are required.')).toBeInTheDocument();
  });

  it('submits the form with updated values when editing a note', () => {
    const mockDispatch = jest.fn();
    const mockToggleModal = jest.fn();
    const mockDataToEdit = {
      id: 1,
      title: 'Old Title',
      note: '7',
      commentary: 'Old Commentary',
    };

    render(
      <NoteForm
        dispatch={mockDispatch}
        dataToEdit={mockDataToEdit}
        toggleModal={mockToggleModal}
      />
    );

    const titleInput = screen.getByLabelText('Titre');
    const noteInput = screen.getByLabelText('Note');
    const commentaryInput = screen.getByLabelText('Commentaire');
    const submitButton = screen.getByText('Update rate');

    const updatedTitle = 'Updated Title';
    const updatedNote = '9';
    const updatedCommentary = 'Updated Commentary';

    fireEvent.change(titleInput, { target: { value: updatedTitle } });
    fireEvent.change(noteInput, { target: { value: updatedNote } });
    fireEvent.change(commentaryInput, { target: { value: updatedCommentary } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_NOTE',
      payload: {
        id: mockDataToEdit.id,
        updates: {
          id: expect.any(Number),
          title: updatedTitle,
          note: updatedNote,
          commentary: updatedCommentary,
        },
      },
    });

    expect(mockToggleModal).toHaveBeenCalled();
  });
});
