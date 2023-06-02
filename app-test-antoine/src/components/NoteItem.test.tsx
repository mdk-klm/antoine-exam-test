import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteItem from './NoteItem';
import { ratesReducer, Rate, Action } from '../reducer/ratesReducer';

describe('NoteItem', () => {
  const rate: Rate = {
    id: 1,
    title: 'Note 1',
    note: 8,
    commentary: 'Comment 1',
  };

  const dispatchMock = jest.fn();

  test('renders NoteItem component', () => {
    render(
      <table>
        <tbody>
          <NoteItem
            {...rate}
            handleEdit={jest.fn()}
            dispatch={dispatchMock}
            backgroundColor="red"
          />
        </tbody>
      </table>
    );

    const noteTitle = screen.getByText('Note 1');
    expect(noteTitle).toBeInTheDocument();

    const noteValue = screen.getByText('8');
    expect(noteValue).toBeInTheDocument();

    const noteCommentary = screen.getByText('Comment 1');
    expect(noteCommentary).toBeInTheDocument();
  });

  test('calls handleEdit when edit icon is clicked', () => {
    const handleEditMock = jest.fn();

    render(
      <table>
        <tbody>
          <NoteItem
            {...rate}
            handleEdit={handleEditMock}
            dispatch={dispatchMock}
            backgroundColor="red"
          />
        </tbody>
      </table>
    );

    const editIcon = screen.getByRole('button', { name: 'Edit' });
    fireEvent.click(editIcon);

    expect(handleEditMock).toHaveBeenCalledTimes(1);
    expect(handleEditMock).toHaveBeenCalledWith(1);
  });

  test('calls dispatch with DELETE_NOTE action when delete icon is clicked and confirmed', () => {
    window.confirm = jest.fn().mockReturnValue(true);

    render(
      <table>
        <tbody>
          <NoteItem
            {...rate}
            handleEdit={jest.fn()}
            dispatch={dispatchMock}
            backgroundColor="red"
          />
        </tbody>
      </table>
    );

    const deleteIcon = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteIcon);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'DELETE_NOTE',
      payload: { id: 1 },
    });
  });

  test('does not call dispatch with DELETE_NOTE action when delete icon is clicked and not confirmed', () => {
    window.confirm = jest.fn().mockReturnValue(false);

    render(
      <table>
        <tbody>
          <NoteItem
            {...rate}
            handleEdit={jest.fn()}
            dispatch={dispatchMock}
            backgroundColor="red"
          />
        </tbody>
      </table>
    );

    const deleteIcon = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteIcon);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});

describe('ratesReducer', () => {
  const initialState = {
    rates: [
      {
        id: 1,
        title: 'Note 1',
        note: 8,
        commentary: 'Comment 1',
      },
      {
        id: 2,
        title: 'Note 2',
        note: 10,
        commentary: 'Comment 2',
      },
    ],
  };

  test('handles ADD_NOTE action correctly', () => {
    const newRate: Rate = {
      id: 3,
      title: 'Note 3',
      note: 12,
      commentary: 'Comment 3',
    };

    const action: Action = {
      type: 'ADD_NOTE',
      payload: newRate,
    };

    const newState = ratesReducer(initialState, action);

    expect(newState.rates).toHaveLength(3);
    expect(newState.rates[2]).toEqual(newRate);
  });

  test('handles UPDATE_NOTE action correctly', () => {
    const updatedRate: Rate = {
      id: 1,
      title: 'Updated Note 1',
      note: 9,
      commentary: 'Updated Comment 1',
    };

    const action: Action = {
      type: 'UPDATE_NOTE',
      payload: {
        id: 1,
        updates: updatedRate,
      },
    };

    const newState = ratesReducer(initialState, action);

    expect(newState.rates[0]).toEqual(updatedRate);
    expect(newState.rates[1]).toEqual(initialState.rates[1]);
  });

  test('handles DELETE_NOTE action correctly', () => {
    const action: Action = {
      type: 'DELETE_NOTE',
      payload: { id: 2 },
    };

    const newState = ratesReducer(initialState, action);

    expect(newState.rates).toHaveLength(1);
    expect(newState.rates[0]).toEqual(initialState.rates[0]);
  });

  test('returns the initial state for unknown action type', () => {
    const action: Action = {
      type: 'UNKNOWN_ACTION',
      payload: { id: 1 },
    };

    const newState = ratesReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
