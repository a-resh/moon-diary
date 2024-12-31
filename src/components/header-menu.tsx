import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {StateContext} from '../state';
import {secondColor} from '../styles';
import {Button} from 'react-native-paper';
import {useFonts} from 'expo-font';

export const HeaderMenu: React.FC = () => {
  const {activeTab, setActiveTab} = useContext(StateContext);
  const [loaded] = useFonts({
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
  });
  if (!loaded) return null;

  return (
    <View style={styles.buttonsWrapper}>
      <Button
        style={{
          borderWidth: activeTab === 'today' ? 3 : 1,
          ...styles.buttonMenu,
          borderRightWidth: activeTab === 'today' ? 3 : 0,
        }}
        onPress={() => setActiveTab('today')}
        buttonColor={activeTab === 'today' ? '#c39640' : '#dbb683'}
        textColor={'#fffdf7'}
        labelStyle={{fontFamily: 'NunitoBold', fontSize: 18}}
        contentStyle={{height: '100%'}}
        mode={'outlined'}
      >
        Today
      </Button>
      <Button
        style={{
          borderWidth: activeTab === 'calendar' ? 3 : 1,
          ...styles.buttonMenu,
          borderLeftWidth: activeTab === 'calendar' ? 3 : 0,
        }}
        onPress={() => setActiveTab('calendar')}
        labelStyle={{fontFamily: 'NunitoBold', fontSize: 18}}
        buttonColor={activeTab === 'calendar' ? '#c39640' : '#dbb683'}
        textColor={'#fffdf7'}
        contentStyle={{height: '100%'}}
        mode={'outlined'}
      >
        Calendar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsWrapper: {
    // alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonMenu: {
    // flex: 0.45,
    borderRadius: 0,
    width: '50%',
    height: '100%',
    // borderWidth: 0,
    fontSize: 20,
    borderColor: '#dad1b2',

    // borderBottomWidth: 5
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
