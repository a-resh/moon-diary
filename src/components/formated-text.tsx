import {StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {useFonts} from 'expo-font';

export const FormattedText: React.FC<{style?: any}> = ({children, style}) => {
  const [loaded] = useFonts({
    Gadugi: require('../../assets/fonts/gadugi-normal.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={[style, {fontFamily: 'Gadugi'}]}>{children}</Text>;
};
