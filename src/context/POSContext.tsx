import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState, posReducer, POSState, POSAction } from './posReducer';

export interface POSContextType extends POSState {
  dispatch: React.Dispatch<POSAction>;
}

const POSContext = createContext<POSContextType | null>(null);

interface POSProviderProps {
  children: ReactNode;
  initialState?: POSState;
  reducer?: (state: POSState, action: POSAction) => POSState;
}

export const POSProvider: React.FC<POSProviderProps> = ({
  children,
  initialState: providedInitialState,
  reducer,
}) => {
  const [state, dispatch] = useReducer(reducer || posReducer, providedInitialState || initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('@pos_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          dispatch({ type: 'INIT_FROM_STORAGE', payload: parsed });
        }
      } catch (e) {
        console.log('Failed to load data', e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('@pos_data', JSON.stringify(state));
      } catch (e) {
        console.log('Failed to save data', e);
      }
    };
    saveData();
  }, [state]);

  return (
    <POSContext.Provider value={{ ...state, dispatch }}>
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = (): POSContextType => {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error('usePOS must be used within a POSProvider');
  }
  return context;
};

export default POSContext;

