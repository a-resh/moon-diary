import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {sectionIconNameMap, SectionTypes} from '../types';
import {StateContext} from '../state';
import * as SunCalc from 'suncalc';
import {List, Text} from 'react-native-paper';
import {
  primaryColor,
  primaryColorActive,
  remSize,
  secondColor,
} from '../styles';
import {t} from 'i18n-js';
import {capitalize} from 'lodash';
import {useFonts} from 'expo-font';

const Section: React.FC<{typeOfSection: SectionTypes}> = ({typeOfSection}) => {
  const {currentMoonDay} = useContext(StateContext);
  const [isExpanded, setIsExpanded] = useState(false);

  SunCalc.getMoonTimes(new Date(), 0, 0);
  const [loaded] = useFonts({
    NunitoBolt: require('../../assets/fonts/Nunito-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <List.Accordion
      id={typeOfSection}
      title={capitalize(t(typeOfSection))}
      titleStyle={{fontSize: 20, fontFamily: 'NunitoBolt', color: '#474236'}}
      style={{
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#dad1b2',
        backgroundColor: isExpanded ? '#dad1b2' : '#b2aa7b',
        marginVertical: 3,
      }}
      onPress={() => setIsExpanded(false)}
      expanded={isExpanded}
      left={props => (
        <List.Icon
          {...props}
          color={'#51726e'}
          icon={sectionIconNameMap[typeOfSection]}
        />
      )}
    >
      <View
        style={{
          width: '100%',
          paddingHorizontal: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <View style={styles.container}>
          <Text
            style={{fontFamily: 'NunitoBolt', color: '#474236'}}
            variant={'bodyMedium'}
          >
            {t(`${currentMoonDay}.${typeOfSection}`)}
          </Text>
        </View>
      </View>
      {/*<List.Item*/}
      {/*  title={''}*/}
      {/*  description={t(`${currentMoonDay}.${typeOfSection}`)}*/}
      {/*  // descriptionStyle={styles.container}*/}
      {/*></List.Item>*/}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dad1b2',
    textAlign: 'center',
    // paddingHorizontal: 10,
    // alignSelf: 'stretch',
    padding: 10,
    position: 'relative',
    marginLeft: -20,
    fontSize: 14,
  },
  button: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryColor,
    padding: 20,
    alignSelf: 'stretch',
    borderColor: '#dfe5d2',
    borderWidth: 4,
    borderRadius: 35,
    fontSize: remSize,
  },
  buttonText: {
    textTransform: 'capitalize',
    // color: secondColor,
    fontSize: 20,
    // alignSelf: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: primaryColorActive,
    // padding: 10,
  },
  countText: {
    color: secondColor,
  },
  icon: {
    marginLeft: 'auto',
    // alignSelf: 'flex-end',
  },
});

export default Section;
