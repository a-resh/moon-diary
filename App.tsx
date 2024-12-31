/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/header';
import {sectionTypes} from './src/types';
import Section from './src/components/section';
import {StateProvider} from './src/state';
import {setI18nConfig} from './src/localization/config';
import {LocaleConfig} from 'react-native-calendars';
import {List, PaperProvider} from 'react-native-paper';
import i18n from 'i18n-js';
import moment from 'moment';
import {Theme} from './src/styles';
import {ConfigModal} from './src/components/config-modal';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const setLocalization = useCallback(async () => {
    await setI18nConfig();
  }, []);
  useEffect(() => {
    setLocalization().then(() => {
      LocaleConfig.locales[i18n.locale] = {
        monthNames: moment()
          .locale(i18n.locale)
          .localeData()
          .months()
          .map(month => `${month.charAt(0).toUpperCase()}${month.slice(1)}`),
        monthNamesShort: moment()
          .locale(i18n.locale ?? 'en')
          .localeData()
          .monthsShort(),
        dayNames: moment()
          .locale(i18n.locale ?? 'en')
          .localeData()
          .weekdays(),
        dayNamesShort: moment()
          .locale(i18n.locale ?? 'en')
          .localeData()
          .weekdaysShort(),
        today: i18n.t('today'),
      };
      LocaleConfig.defaultLocale = i18n.locale ?? 'en';
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.light : Colors.dark,
  };

  return (
    <PaperProvider theme={Theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={'light-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <StateProvider>
            <Header />
            <View
              style={{
                padding: 5,
                backgroundColor: '#dbb683',
                borderTopColor: '#dad1b2',
                borderTopWidth: 5,
              }}
            >
              <List.AccordionGroup>
                {sectionTypes.map((type, index) => (
                  <Section key={index} typeOfSection={type} />
                ))}
              </List.AccordionGroup>
            </View>
            {/*</ContentWrapper>*/}
            <ConfigModal />
          </StateProvider>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
