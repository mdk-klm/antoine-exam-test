import { State, ratesReducer, Action } from "../reducer/ratesReducer";





describe('noteReducer', () => {

  let initialState: State;

  beforeEach(() => {

    initialState = {
      rates: [

        { id: 1, title: 'Note 1', note: 5, commentary: 'Hey note' },
        { id: 2, title: 'Note 2', note: 3, commentary: 'Average note' }

      ]
    };
  });


  it('should add a new note when action type is ADD_NOTE', () => {

    const action: Action = {
      type: 'ADD_NOTE',
      payload: { id: 3, title: 'Note 3', note: 14, commentary: 'Good note' }
    };


    const newState = ratesReducer(initialState, action);


    expect(newState.rates).toHaveLength(initialState.rates.length + 1);
    expect(newState.rates).toContainEqual(action.payload);

  });




  it('should update the note when action type is UPDATE_NOTE', () => {

    const action: Action = {

      type: 'UPDATE_NOTE',

      payload: {

        id: 2,

        updates: { id: 1, title: '', note: 4, commentary: 'Updated note' }

      }

    };




    const newState = ratesReducer(initialState, action);




    expect(newState.rates).toHaveLength(initialState.rates.length);

    expect(newState.rates[1].note).toEqual(action.payload.updates.rate);

    expect(newState.rates[1].commentary).toEqual(action.payload.updates.commentary);

  });




  it('should delete the note when action type is DELETE_NOTE', () => {

    const action: Action = {

      type: 'DELETE_NOTE',

      payload: { id: 1 }

    };




    const newState = ratesReducer(initialState, action);




    expect(newState.rates).toHaveLength(initialState.rates.length - 1);

    expect(newState.rates).not.toContainEqual(initialState.rates[0]);

  });




  it('should return the current state when action type is unknown', () => {

    const action: Action = {

      type: 'UNKNOWN_ACTION',

      payload: { id: 1 }

    };




    const newState = ratesReducer(initialState, action);




    expect(newState).toEqual(initialState);

  });

});

