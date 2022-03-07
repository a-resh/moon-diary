import {StyleSheet, View} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {StateContext} from '../state';
import {HeaderMenu} from './header-menu';
import {TodayTab} from './today-tab';
import {CalendarTab} from './calendar-tab';
import {primaryColor} from '../styles';
import moment from 'moment/moment';
import {lunarDays} from '../data/calculate-moon-day';
import {MoonDayData, MoonDays} from '../types';
import {getLocation, getStorageData} from '../data/get-geolocation';

const Header: React.FC = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const {
    setCurrentMoonDay,
    currentDate,
    activeTab,
    setCurrentMoonDayData,
    location,
    setLocation,
  } = useContext(StateContext);
  const recalculateDate = () => {
    const date = moment(currentDate);

    let result = lunarDays(date, location[0] | 50, location[1] | 30);
    setCurrentMoonDayData(result as MoonDayData[]);
    setCurrentMoonDay(
      result
        .find(moonDay => date.isBetween(moonDay.start, moonDay.end))
        ?.number?.toString() as MoonDays,
    );
  };
  const getLocationData = useCallback(async () => {
    await getLocation(setLocation);
  }, []);
  useEffect(() => {
    recalculateDate();
  }, []);
  useEffect(() => {
    recalculateDate();
  }, [currentDate, location]);
  return (
    <View style={styles.wrapper}>
      <HeaderMenu />
      {activeTab === 'today' ? <TodayTab /> : <CalendarTab />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: primaryColor,
  },
});

export default Header;
