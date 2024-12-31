import {StyleSheet, View, Image} from 'react-native';
import {FormattedText} from './formated-text';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StateContext} from '../state';
import {secondColor} from '../styles';
import {MoonDaySwitcher} from './moon-day-switcher';
import 'moment/min/locales';
import i18n, {t} from 'i18n-js';
import * as SunCalc from 'suncalc';
import {format} from 'date-fns/format';
import {timeLocale} from '../localization/config';
import {IconButton} from 'react-native-paper';
type PhaseData = {
  name: string;
};

export const TodayTab: React.FC = () => {
  const {currentMoonDay, currentDate, setIsShowConfigDialog} =
    useContext(StateContext);
  const [moonPhase, setMoonPhase] = useState<PhaseData>({
    name: 'fullMoon',
  });

  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <View style={styles.configWrapper}>
        <IconButton
          onPress={() => setIsShowConfigDialog(true)}
          icon={'cog'}
          containerColor={'#ebc298'}
          iconColor={'#b56130'}
          mode={'contained'}
        />
      </View>
      {/*<AnimationView styles={{height: '100%'}}>*/}
      <View style={styles.contentWrapper}>
        <View style={styles.titleWrapper}>
          <View style={styles.title}>
            <FormattedText font={'NunitoBold'} style={styles.dateText}>
              {format(currentDate, 'd MMMM', {
                locale: timeLocale[i18n.locale]
                  ? timeLocale[i18n.locale]
                  : timeLocale.en,
              })}
            </FormattedText>
            <FormattedText font={'NunitoBold'} style={styles.moonPhase}>
              {t(moonPhase.name)}
            </FormattedText>
          </View>
        </View>
        <View style={styles.top}>
          {/*<View style={styles.imageWrapper}>{moonPhase.image}</View>*/}
          <View style={styles.moonDay}>
            <FormattedText font={'BerlinEmailBold'} style={[styles.text]}>
              {currentMoonDay}
            </FormattedText>
          </View>
        </View>
        <MoonDaySwitcher withButtons />
      </View>
      {/*</AnimationView>*/}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 350,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#b56130',
    // borderBottomColor: '#dad1b2',
    // borderBottomWidth: 5,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    maxHeight: '100%',
    paddingBottom: '3%',
  },
  border: {
    position: 'absolute',
    marginTop: '5%',
    width: '90%',
    height: '90%',
    marginBottom: '5%',
    borderWidth: 3,
    borderColor: '#ebc298',
    borderRadius: 5,
  },
  // stub: {
  //   position: 'absolute',
  //   width: '70%',
  //   height: '10%',
  //   // borderWidth: 1,
  //   borderColor: '#ebc298',
  //   backgroundColor: '#b56130',
  //   alignSelf: 'flex-start',
  //   marginTop: '70%',
  //   marginLeft: '50%',
  //   zIndex: 3,
  //   transform: [{translateX: -150}]
  // },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 240,
  },
  moonDay: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  configWrapper: {
    marginTop: 30,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '85%',
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  moonImage: {
    resizeMode: 'center',
    height: 120,
    width: 120,
  },
  logo: {
    resizeMode: 'cover',
  },
  text: {
    fontSize: 170,
    // fontWeight: '100',
    textAlign: 'center',
    color: secondColor,
  },
  titleWrapper: {
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // height: 50,
    paddingLeft: 10,
    paddingTop: 10,
    width: '50%',
    // alignSelf: 'stretch',
    zIndex: 10,
    backgroundColor: '#b56130',
  },
  dateText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: secondColor,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  moonPhase: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: secondColor,
  },
});
