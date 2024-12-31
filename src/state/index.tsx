import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {MoonDayData, MoonDays} from '../types';
import {getLocation} from '../data/get-geolocation';
type Tabs = 'today' | 'calendar';
type IState = {
  isShowDialog: boolean;
  currentMoonDay: MoonDays;
  currentDate: Date;
  activeTab: Tabs;
  currentMoonDaysData: MoonDayData[];
  location: number[];
  headerSize: number;
};
type IStateFunctions = {
  setCurrentMoonDay: (day: MoonDays) => void;
  setCurrentDate: (date: Date) => void;
  setActiveTab: (tab: Tabs) => void;
  setCurrentMoonDayData: (data: MoonDayData[]) => void;
  setLocation: (location: number[]) => void;
  setHeaderSize: (size: number) => void;
  setIsShowConfigDialog: (isShowDialog: boolean) => void;
};
export const StateContext = React.createContext<IState & IStateFunctions>({
  currentMoonDay: '1',
  isShowDialog: false,
  currentDate: new Date(),
  activeTab: 'today',
  currentMoonDaysData: [],
  location: [],
  headerSize: 1,
  setCurrentMoonDay: () => {},
  setCurrentDate: () => {},
  setActiveTab: () => {},
  setCurrentMoonDayData: () => {},
  setLocation: () => {},
  setHeaderSize: () => {},
  setIsShowConfigDialog: () => {},
});

export const StateProvider: React.FC<{children: ReactNode | ReactNode[]}> = ({
  children,
}) => {
  const [state, setState] = useState<IState>({
    activeTab: 'today',
    isShowDialog: false,
    currentMoonDay: '1',
    currentDate: new Date(),
    currentMoonDaysData: [],
    location: [50, 30],
    headerSize: 350,
  });
  const getLocationData = useCallback(async () => {
    await getLocation(setLocation);
  }, []);
  useEffect(() => {
    getLocationData();
  }, []);
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
  const setHeaderSize = (headerSize: number) => {
    setState(s => ({...s, headerSize}));
  };
  const setIsShowConfigDialog = (isShowDialog: boolean) => {
    setState(s => ({...s, isShowDialog}));
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
        setHeaderSize,
        setIsShowConfigDialog,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
