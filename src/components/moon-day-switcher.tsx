import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  primaryColor,
  primaryColorActive,
  secondColor,
  secondColorActive,
} from '../styles';
import moment from 'moment/moment';
import {StateContext} from '../state';
import {FormattedText} from './formated-text';
import {t} from 'i18n-js';

export const MoonDaySwitcher: React.FC<{
  withButtons?: boolean;
  withDates?: boolean;
}> = ({withButtons, withDates}) => {
  const {currentDate, setCurrentDate, currentMoonDaysData} =
    useContext(StateContext);
  const onMoveDay = (button: 'left' | 'right') => {
    const date =
      button === 'left'
        ? moment(currentDate).subtract(1, 'd').toDate()
        : moment(currentDate).add(1, 'd').toDate();
    setCurrentDate(date);
  };
  return (
    <View style={[styles.wrapper]}>
      {withButtons ? (
        <Icon.Button
          underlayColor={primaryColor}
          backgroundColor="rgba(0,0,0,0)"
          name="angle-left"
          onPress={() => onMoveDay('left')}
          size={35}
          color={secondColor}
        />
      ) : null}
      <View style={styles.dateWrapper}>
        <View style={styles.textWrapper}>
          {currentMoonDaysData.map((moonDay, i) => (
            <View key={`${i}-d`} style={styles.moonDayWrapper}>
              <View style={[styles.moonDay]}>
                <FormattedText>{moonDay.number} </FormattedText>
              </View>
              {withDates ? (
                <FormattedText style={[styles.textSmall]}>
                  {`${moment(moonDay.start).format('D.MM.YY H:MM')} - ${moment(
                    moonDay.end,
                  ).format('D.MM.YY H:MM')}`}
                </FormattedText>
              ) : (
                <FormattedText style={styles.textSmall}>
                  {`${
                    moment(moonDay.start).isSame(moment(currentDate), 'd')
                      ? moment(moonDay.start).format('H:MM')
                      : t('fromYesterday')
                  } ${
                    moment(moonDay.end).isSame(moment(currentDate), 'd')
                      ? moment(moonDay.end).format('H:MM')
                      : t('tomorrow')
                  }`}
                </FormattedText>
              )}
            </View>
          ))}
        </View>
      </View>
      {withButtons ? (
        <Icon.Button
          underlayColor={primaryColor}
          backgroundColor="rgba(0,0,0,0)"
          name="angle-right"
          onPress={() => onMoveDay('right')}
          size={35}
          color={secondColor}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 15,
    fontWeight: '300',
    color: secondColor,
    textAlign: 'left',
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dateWrapper: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    height: 60,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  moonDayWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  moonDay: {
    display: 'flex',
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: secondColorActive,
    borderWidth: 1,
    borderRadius: 11,
    marginRight: 5,
    paddingLeft: 2,
  },
});
