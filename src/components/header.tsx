import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {StateContext} from '../state';
import {HeaderMenu} from './header-menu';
import {TodayTab} from './today-tab';
import {CalendarTab} from './calendar-tab';
import {lunarDays} from '../data/calculate-moon-day';
import {MoonDayData, MoonDays} from '../types';
import {isAfter} from 'date-fns/isAfter';
import {isBefore} from 'date-fns/isBefore';
import {AnimationView} from './animation-view';
import {AnimatedViewCalendar} from './animated-view-calendar';

const Header: React.FC = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const {
    setCurrentMoonDay,
    currentDate,
    activeTab,
    setCurrentMoonDayData,
    location,
  } = useContext(StateContext);
  const recalculateDate = () => {
    const date = currentDate;

    let result = lunarDays(currentDate, location[0] | 50, location[1] | 30);
    setCurrentMoonDayData(result as MoonDayData[]);
    setCurrentMoonDay(
      result
        .find(
          moonDay =>
            isAfter(date, moonDay.start) &&
            isBefore(date, moonDay.end || new Date()),
        )
        ?.number?.toString() as MoonDays,
    );
  };
  useEffect(() => {
    recalculateDate();
  }, []);
  useEffect(() => {
    recalculateDate();
  }, [currentDate, location]);
  return (
    <View style={styles.wrapper}>
      <HeaderMenu />
      {activeTab === 'today' ? (
        <AnimationView side={'left'}>
          <TodayTab />
        </AnimationView>
      ) : (
        <AnimatedViewCalendar>
          <CalendarTab />
        </AnimatedViewCalendar>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#b56130',
  },
});

export default Header;
