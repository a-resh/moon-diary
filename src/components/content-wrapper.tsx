import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

export const ContentWrapper: React.FC<{children: ReactNode | ReactNode[]}> = ({
  children,
}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    // padding: 5,
    // paddingTop: 20,
  },
});
