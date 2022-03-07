import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {StateContext} from '../state';
import {primaryColor, primaryColorActive, secondColor} from '../styles';
import {t} from 'i18n-js';
// @ts-ignore
import InsetShadow from 'react-native-inset-shadow';
import {FormattedText} from './formated-text';

export const HeaderMenu: React.FC = () => {
  const {activeTab, setActiveTab} = useContext(StateContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.buttonsWrapper}>
      <View
        style={[
          styles.buttonMenu,
          {borderBottomWidth: activeTab === 'today' ? 2 : 0},
        ]}
      >
        <InsetShadow>
          <TouchableHighlight
            underlayColor={primaryColor}
            onPress={() => setActiveTab('today')}
            style={styles.buttonMenuTouch}
          >
            <FormattedText style={styles.text}>{t('Today')}</FormattedText>
          </TouchableHighlight>
        </InsetShadow>
      </View>
      <View
        style={[
          styles.buttonMenu,
          {borderBottomWidth: activeTab === 'calendar' ? 2 : 0},
        ]}
      >
        <InsetShadow>
          <TouchableHighlight
            underlayColor={primaryColor}
            onPress={() => setActiveTab('calendar')}
            style={styles.buttonMenuTouch}
          >
            <FormattedText style={styles.text}>{t('Calendar')}</FormattedText>
          </TouchableHighlight>
        </InsetShadow>
      </View>
      {/*<View style={styles.iconButtonWrapper}>*/}
      {/*  <Icon.Button*/}
      {/*    underlayColor={primaryColor}*/}
      {/*    name="ellipsis-v"*/}
      {/*    onPress={() => setIsModalVisible(s => !s)}*/}
      {/*    size={25}*/}
      {/*    backgroundColor="rgba(0,0,0,0)"*/}
      {/*    color={secondColor}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  buttonMenu: {
    // flex: 0.45,

    width: '50%',
    height: '100%',

    borderBottomColor: secondColor,
  },
  buttonMenuTouch: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: secondColor,
    fontSize: 18,
  },
  iconButtonWrapper: {
    // flex: 0.1,
    width: '12%',
    // height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
