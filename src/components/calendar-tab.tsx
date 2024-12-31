import React, {useContext, useState} from 'react';
import {Calendar} from 'react-native-calendars/src';
import {StateContext} from '../state';
import {secondColor, secondColorActive} from '../styles';
import {View} from 'react-native';
import {MoonDaySwitcher} from './moon-day-switcher';
import moment from 'moment';

export const CalendarTab: React.FC = () => {
  const {setCurrentDate, setActiveTab, currentDate, headerSize} =
    useContext(StateContext);
  const [, setCalendarHeight] = useState(350);

  // @ts-ignore
  return (
    <View
      style={{maxHeight: headerSize, paddingBottom: '3%'}}
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setCalendarHeight(Math.round(height));
      }}
    >
      {/*<View onLayout={(event) => {*/}
      {/*  const {x, y, width, height} = event.nativeEvent.layout;*/}
      {/*  console.log(x, y, width, height);*/}
      {/*  setCalendarHeight(Math.round(height))*/}
      {/*}}>*/}
      <Calendar
        // Specify style for calendar container element. Default = {}
        style={{
          // borderWidth: 1,
          // borderColor: 'gray',
          height: headerSize - 90,
          backgroundColor: '#b56130',
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
          backgroundColor: '#b56130',
          calendarBackground: '#b56130',
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
      {/*</View>*/}
      {/*<View style={{position: 'absolute', width: '100%', marginTop: calendarHeight - 70}} >*/}
      <MoonDaySwitcher withDates />
      {/*</View>*/}
    </View>
  );
};
