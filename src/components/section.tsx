import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SectionTypes} from '../types';
import {StateContext} from '../state';
import * as SunCalc from 'suncalc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor, primaryColorActive, secondColor} from '../styles';
import {t} from 'i18n-js';
// @ts-ignore
import InsetShadow from 'react-native-inset-shadow';
import {FormattedText} from './formated-text';

const Section: React.FC<{typeOfSection: SectionTypes}> = ({typeOfSection}) => {
  const [displayText, setDisplayText] = useState<boolean>(false);
  const onPress = () => setDisplayText(v => !v);
  const {currentMoonDay} = useContext(StateContext);
  SunCalc.getMoonTimes(new Date(), 0, 0);
  return (
    <View style={styles.container}>
      <InsetShadow>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <FormattedText style={styles.buttonText}>
              {t(typeOfSection)}
            </FormattedText>
            <View style={styles.icon}>
              {displayText ? (
                <Icon
                  // @ts-ignore
                  backgroundColor="rgba(0,0,0,0)"
                  name="angle-up"
                  size={30}
                  color={secondColor}
                />
              ) : (
                <Icon
                  // @ts-ignore
                  backgroundColor="rgba(0,0,0,0)"
                  name="angle-down"
                  size={30}
                  color={secondColor}
                />
              )}
            </View>
          </View>
        </TouchableHighlight>
        <View
          style={{...styles.contentContainer, padding: displayText ? 10 : 0}}
        >
          <Text
            style={{
              ...styles.countText,
              display: displayText ? 'flex' : 'none',
            }}
          >
            {t(`${currentMoonDay}.${typeOfSection}`)}
          </Text>
        </View>
      </InsetShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingHorizontal: 10,
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryColorActive,
    padding: 20,
    alignSelf: 'stretch',
    // borderTopColor: secondColor,
    // borderTopWidth: 1,
  },
  buttonText: {
    textTransform: 'capitalize',
    color: secondColor,
    fontSize: 18,
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
