import React, {useState} from 'react';
import {MoonDayData, MoonDays} from '../types';
type Tabs = 'today' | 'calendar';
type IState = {
  currentMoonDay: MoonDays;
  currentDate: Date;
  activeTab: Tabs;
  currentMoonDaysData: MoonDayData[];
  location: number[];
};
type IStateFunctions = {
  setCurrentMoonDay: (day: MoonDays) => void;
  setCurrentDate: (date: Date) => void;
  setActiveTab: (tab: Tabs) => void;
  setCurrentMoonDayData: (data: MoonDayData[]) => void;
  setLocation: (location: number[]) => void;
};
export const StateContext = React.createContext<IState & IStateFunctions>({
  currentMoonDay: '1',
  currentDate: new Date(),
  activeTab: 'today',
  currentMoonDaysData: [],
  location: [],
  setCurrentMoonDay: () => {},
  setCurrentDate: () => {},
  setActiveTab: () => {},
  setCurrentMoonDayData: () => {},
  setLocation: () => {},
});

export const StateProvider: React.FC = ({children}) => {
  const [state, setState] = useState<IState>({
    activeTab: 'today',
    currentMoonDay: '1',
    currentDate: new Date(),
    currentMoonDaysData: [],
    location: [50, 30],
  });
  const setCurrentMoonDay = (day: MoonDays) => {
    setState(s => ({...s, currentMoonDay: day}));
  };
  const setCurrentDate = (date: Date) => {
    setState(s => ({...s, currentDate: date}));
  };
  const setActiveTab = (tab: Tabs) => {
    setState(s => ({...s, activeTab: tab}));
  };
  const setCurrentMoonDayData = (data: MoonDayData[]) => {
    setState(s => ({...s, currentMoonDaysData: data}));
  };
  const setLocation = (data: number[]) => {
    setState(s => ({...s, location: data}));
  };
  return (
    <StateContext.Provider
      value={{
        ...state,
        setCurrentMoonDay,
        setCurrentDate,
        setActiveTab,
        setCurrentMoonDayData,
        setLocation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
