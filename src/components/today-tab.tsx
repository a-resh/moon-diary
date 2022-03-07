import {StyleSheet, Text, View, Image} from 'react-native';
import {FormattedText} from './formated-text';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StateContext} from '../state';
import {secondColor} from '../styles';
import {MoonDaySwitcher} from './moon-day-switcher';
import moment from 'moment';
import 'moment/min/locales';
import i18n, {t} from 'i18n-js';
import * as SunCalc from 'suncalc';
type PhaseData = {
  name: string;
  image: React.ReactNode;
};

export const TodayTab: React.FC = () => {
  const defaultImage = (
    <Image
      source={require('../../assets/full-moon.png')}
      style={[styles.moonImage]}
    />
  );
  const {currentMoonDay, currentDate, setCurrentDate} =
    useContext(StateContext);
  const [moonPhase, setMoonPhase] = useState<PhaseData>({
    name: 'fullMoon',
    image: defaultImage,
  });
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);
  useEffect(() => {
    const phaseData = getMoonPhase();
    setMoonPhase(p => (phaseData ? phaseData : p));
  }, [currentDate]);
  const getMoonPhase = useCallback(() => {
    const {phase} = SunCalc.getMoonIllumination(currentDate);
    if (phase < 0.1) {
      return {
        name: 'newMoon',
        image: (
          <Image
            source={require('../../assets/new-moon.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 0.12) {
      return {
        name: 'waxingCrescent',
        image: (
          <Image
            source={require('../../assets/waxing-crescent.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 0.25) {
      return {
        name: 'firstQuarter',
        image: (
          <Image
            source={require('../../assets/first-quarter.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 0.41) {
      return {
        name: 'waxingGibbous',
        image: (
          <Image
            source={require('../../assets/waxing-gibbous.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 0.53) {
      return {
        name: 'fullMoon',
        image: (
          <Image
            source={require('../../assets/full-moon.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 0.7) {
      return {
        name: 'waningGibbous',
        image: (
          <Image
            source={require('../../assets/waning-gibbous.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 0.83) {
      return {
        name: 'thirdQuarter',
        image: (
          <Image
            source={require('../../assets/third-quarter.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
    if (phase < 1) {
      return {
        name: 'waningCrescent',
        image: (
          <Image
            source={require('../../assets/waning-crescent.png')}
            style={[styles.moonImage]}
          />
        ),
      };
    }
  }, [currentDate]);
  return (
    <View style={styles.wrapper}>
      <View style={styles.title}>
        <FormattedText style={styles.dateText}>
          {moment(currentDate).locale(i18n.locale).format('D MMMM YYYY')}
        </FormattedText>
        <FormattedText style={styles.moonPhase}>
          {t(moonPhase.name)}
        </FormattedText>
      </View>
      <View style={styles.top}>
        <View style={styles.imageWrapper}>{moonPhase.image}</View>
        <View style={styles.moonDay}>
          <FormattedText style={[styles.text]}>{currentMoonDay}</FormattedText>
        </View>
      </View>
      <MoonDaySwitcher withButtons />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: 350,
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
  },
  moonDay: {
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
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
    fontWeight: '100',
    textAlign: 'center',
    color: secondColor,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 50,
    paddingLeft: 10,
    paddingTop: 10,
    alignSelf: 'stretch',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: secondColor,
    textTransform: 'capitalize',
  },
  moonPhase: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: secondColor,
  },
});
