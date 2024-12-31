import {Text} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {useFonts} from 'expo-font';

export const FormattedText: React.FC<{
  children: ReactNode | ReactNode[];
  style?: any;
  font?: string;
}> = ({children, style, font}) => {
  const [loaded] = useFonts({
    Gadugi: require('../../assets/fonts/gadugi-normal.ttf'),
    BerlinEmailBold: require('../../assets/fonts/berlin-email-bold.ttf'),
    BerlinEmail: require('../../assets/fonts/berlin-email-serif.ttf'),
    NunitoBold: require('../../assets/fonts/Nunito-Bold.ttf'),
    NunitoRegular: require('../../assets/fonts/Nunito-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Text style={[style, {fontFamily: font || 'Gadugi'}]}>{children}</Text>
  );
};
