import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {secondColor, secondColorActive} from '../styles';
import moment from 'moment/moment';
import {StateContext} from '../state';
import {FormattedText} from './formated-text';
import i18n, {t} from 'i18n-js';
import {BlurView} from 'expo-blur';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {capitalize} from 'lodash';
import {isTomorrow} from 'date-fns/isTomorrow';
import {format} from 'date-fns/format';
import {timeLocale} from '../localization/config';
import styled from 'styled-components/native';

export const MoonDaySwitcher: React.FC<{
  withButtons?: boolean;
  withDates?: boolean;
}> = ({withButtons, withDates}) => {
  const {fonts} = useTheme();
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
    <BlurView intensity={50} style={styles.wrapper}>
      {withButtons ? (
        <IconButton
          icon="menu-left"
          onPress={() => onMoveDay('left')}
          size={45}
          iconColor={secondColor}
        />
      ) : null}
      <View style={styles.dateWrapper}>
        <View style={styles.textWrapper}>
          {/*{currentMoonDaysData.map((moonDay, i) => (*/}
          <View style={styles.moonDayWrapper}>
            {withDates ? (
              <MoonDayIcon size={fonts.bodyMedium.fontSize}>
                <Text
                  variant={'bodyMedium'}
                  style={{
                    ...styles.moonDayIcon,
                    lineHeight: fonts.bodyMedium.fontSize + 3,
                  }}
                >
                  {currentMoonDaysData[0].number}
                </Text>
              </MoonDayIcon>
            ) : null}
            <FormattedText font={'NunitoBold'} style={styles.textSmall}>
              {`${
                moment(currentMoonDaysData[0]?.end).isSame(
                  moment(new Date()),
                  'd',
                )
                  ? capitalize(t('fromYesterday'))
                  : isTomorrow(currentMoonDaysData[0]?.end || new Date())
                  ? capitalize(t('tomorrow'))
                  : `${capitalize(t('ends'))} ${format(
                      currentMoonDaysData[0]?.end || new Date(),
                      'd MMMM',
                      {
                        locale: timeLocale[i18n.locale]
                          ? timeLocale[i18n.locale]
                          : timeLocale.en,
                      },
                    )} ${t('at')}`
              } ${moment(currentMoonDaysData[0]?.end).format('H:MM')}`}
            </FormattedText>
            {/*)}*/}
          </View>
          {/*))}*/}
        </View>
      </View>
      {withButtons ? (
        <IconButton
          icon="menu-right"
          onPress={() => onMoveDay('right')}
          size={45}
          iconColor={secondColor}
        />
      ) : null}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 17,
    // fontWeight: '300',
    color: secondColor,
    // textAlign: 'left',
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dateWrapper: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
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
    paddingLeft: 60,
    paddingRight: 60,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 10,
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
  moonDayIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: secondColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const MoonDayIcon = styled.View<{size: number}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size * 1.7}px;
  height: ${props => props.size * 1.7}px;
  border-radius: ${props => props.size * 1.6}px;
  background-color: #577572;
  margin-right: 5px;
  border: 1px solid ${secondColor};
`;
