import { createContext, useReducer } from 'react';

export const AppContext = createContext();

export const AppProvider = props => {
  const value = useReducer((state, action) => {
    switch (action.type) {
      case 'START_REQUEST':
        return {loading: true, error: null};

      case 'STOP_LOADING':
        return {...state, loading: false};

      case 'SET_ERROR':
        return {...state, error: action.error};

      default: return state;
    }
  }, { error: null, loading: false});

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}