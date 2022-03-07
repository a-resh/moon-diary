import React, {useContext, useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars/src';
import {StateContext} from '../state';
import {
  primaryColor,
  primaryColorActive,
  secondColor,
  secondColorActive,
} from '../styles';
import {View} from 'react-native';
import {MoonDaySwitcher} from './moon-day-switcher';
import moment from 'moment';

export const CalendarTab: React.FC = () => {
  const {setCurrentDate, setActiveTab, currentDate} = useContext(StateContext);
  // @ts-ignore
  return (
    <View>
      <Calendar
        // Specify style for calendar container element. Default = {}
        style={{
          // borderWidth: 1,
          // borderColor: 'gray',
          height: 290,
          backgroundColor: primaryColor,
        }}
        markingType={'custom'}
        markedDates={{
          [moment().format('YYYY-MM-DD')]: {
            customStyles: {
              // container: {
              //   backgroundColor: secondColor
              // },
              text: {
                // fontSize: 15,
                color: secondColorActive,
                fontWeight: 'bold',
              },
            },
          },
          [moment(currentDate).format('YYYY-MM-DD')]: {
            customStyles: {
              // container: {
              //   backgroundColor: secondColor
              // },
              text: {
                // fontSize: 15,
                color: '#485123',
                fontWeight: 'bold',
              },
            },
          },
        }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          backgroundColor: primaryColor,
          calendarBackground: primaryColor,
          textSectionTitleColor: secondColor,
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: 'blue',
          todayTextColor: 'red',
          dayTextColor: secondColor,
          textDisabledColor: 'grey',
          dotColor: '#00adf5',
          selectedDotColor: secondColor,
          arrowColor: secondColor,
          disabledArrowColor: '#d9e1e8',
          monthTextColor: secondColor,
          indicatorColor: secondColor,
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          // @ts-ignore
          'stylesheet.day.basic': {
            base: {
              width: 20,
              height: 20,
            },
          },
        }}
        enableSwipeMonths
        onDayPress={day => {
          setCurrentDate(new Date(day.dateString));
          // setActiveTab('today');
        }}
      />
      <MoonDaySwitcher withDates />
    </View>
  );
};
