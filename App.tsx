/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/header';
import {ContentWrapper} from './src/components/content-wrapper';
import {sectionTypes} from './src/types';
import Section from './src/components/section';
import {StateProvider} from './src/state';
import {setI18nConfig} from './src/localization/config';
import {LocaleConfig} from 'react-native-calendars';
import i18n from 'i18n-js';
import moment from 'moment';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    setI18nConfig();
    LocaleConfig.locales[i18n.locale] = {
      monthNames: moment()
        .locale(i18n.locale)
        .localeData()
        .months()
        .map(month => `${month.charAt(0).toUpperCase()}${month.slice(1)}`),
      monthNamesShort: moment().locale(i18n.locale).localeData().monthsShort(),
      dayNames: moment().locale(i18n.locale).localeData().weekdays(),
      dayNamesShort: moment().locale(i18n.locale).localeData().weekdaysShort(),
      today: i18n.t('today'),
    };
    LocaleConfig.defaultLocale = i18n.locale;
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <StateProvider>
          <Header />
          <ContentWrapper>
            {sectionTypes.map((type, index) => (
              <Section key={index} typeOfSection={type} />
            ))}
          </ContentWrapper>
        </StateProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
