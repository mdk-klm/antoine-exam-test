export interface Rate {
  id: number;
  title: string;
  note: number;
  commentary: string;
}

export interface Update {
  id: number;
  updates?: Rate;
}

export interface Action {
  type: 'ADD_NOTE' | 'UPDATE_NOTE' | 'DELETE_NOTE'
  payload: Rate | Update;
}

export interface State {
  rates: Rate[];
}

export const ratesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        rates: [...state.rates, action.payload as Rate]
      };
    case 'UPDATE_NOTE':
      const { id, updates } = action.payload as Update;
      return {
        ...state,
        rates: state.rates.map((rate) => {
          if (rate.id === id) {
            return {
              ...rate,
              ...updates
            };
          }
          return rate;
        })
      };
    case 'DELETE_NOTE': {
      const { id } = action.payload;
      return {
        ...state,
        rates: state.rates.filter((rate) => rate.id !== id)
      };
    }
    default:
      return state;
  }
};