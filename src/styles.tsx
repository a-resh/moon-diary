import {PixelRatio, StyleSheet} from 'react-native';
import {MD3LightTheme, MD3Theme} from 'react-native-paper';

export const primaryColor = '#b2aa7b';
export const primaryColorActive = '#fff9f1';
export const secondColor = '#eae7e0'; //'#fff9f1';
export const secondColorActive = '#eedd46'; //'#fff9f1';
const pixelRation = PixelRatio.get();
export const remSize = pixelRation * 14;

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export const Theme: MD3Theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    background: 'rgba(0, 0, 0, 0)',
  },
};
