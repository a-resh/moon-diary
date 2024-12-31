import {
  Modal,
  Portal,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react';
import {StateContext} from '../state';
import {StyleSheet, View} from 'react-native';
import {FormattedText} from './formated-text';
import {secondColor} from '../styles';
import {BlurView} from 'expo-blur';
import {
  getLocation,
  getStorageData,
  setStorageData,
} from '../data/get-geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeLanguage, timeLocale} from '../localization/config';
import {Dropdown} from 'react-native-element-dropdown';

const colors = {
  backgroundPrimary: '#7d683f',
  borderPrimary: '#9c8357',
  borderSecondary: '#d7b88e',
  borderHighlight: '#bba274',
  textPrimary: 'white',
  textSecondary: '#d7b88e',
  textHighlight: '#9c8357',
};

export enum LanguageLocale {
  en = 'English', // Английский
  ru = 'Русский', // Русский
  uk = 'Українська', // Украинский
  ar = 'العربية', // Арабский
  bn = 'বাংলা', // Бенгальский
  de = 'Deutsch', // Немецкий
  ko = '한국어', // Корейский
  ta = 'தமிழ்', // Тамильский
  pt = 'Português', // Португальский
  th = 'ไทย', // Тайский
  tr = 'Türkçe', // Турецкий
  ur = 'اردو', // Урду
  vi = 'Tiếng Việt', // Вьетнамский
  zh = '中文', // Китайский
  es = 'Español', // Испанский
  fr = 'Français', // Французский
  id = 'Bahasa Indonesia', // Индонезийский
  it = 'Italiano', // Итальянский
  ja = '日本語', // Японский
  hi = 'हिंदी', // Хинди
}

const languages = Object.keys(timeLocale).map(key => ({
  key,
  value: LanguageLocale[key as keyof typeof LanguageLocale],
}));

export const ConfigModal: React.FC = () => {
  const {isShowDialog, setIsShowConfigDialog, setLocation} =
    useContext(StateContext);
  const [locationData, setLocationData] = useState<{
    city: string;
    coord: {long: string; lat: string};
    language?: string | null;
  } | null>(null);
  const [reRender, setRerender] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const setConfigLocationData = async () => {
      const language = await getStorageData('language');
      const city = await getStorageData('city');
      const location = await getStorageData('location');
      if (!city || !location) return;
      const [lat, long] = JSON.parse(location);
      setLocationData({city, coord: {long, lat}, language});
    };
    setConfigLocationData();
  }, [reRender]);
  const setRenewLocationData = async () => {
    setLoading(true);
    await AsyncStorage.removeItem('location');
    await getLocation(setLocation);
    setRerender(prev => prev + 1);
    setLoading(false);
  };
  return (
    <Portal>
      <Modal
        visible={isShowDialog}
        onDismiss={() => setIsShowConfigDialog(!isShowDialog)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.container}>
          <View style={styles.border} />

          {loading ? (
            <ActivityIndicator
              animating={true}
              color={colors.borderSecondary}
              size={'large'}
            />
          ) : (
            <View style={styles.contentWrapper}>
              <View style={styles.title}>
                <FormattedText
                  font={'NunitoBold'}
                  style={{color: secondColor, fontSize: 18}}
                >
                  CONFIGURATION
                </FormattedText>
              </View>
              <View style={styles.configSection}>
                <BlurView intensity={20} tint={'dark'} style={styles.blurView}>
                  <FormattedText
                    font={'NunitoBold'}
                    style={styles.sectionTitle}
                  >
                    Language
                  </FormattedText>
                </BlurView>
                <Dropdown
                  style={[dropdownStyles.dropdown, {width: '80%', zIndex: 15}]} // Custom dimensions
                  placeholderStyle={dropdownStyles.placeholderStyle}
                  selectedTextStyle={dropdownStyles.selectedTextStyle}
                  activeColor={colors.borderPrimary}
                  itemContainerStyle={styles.dropdownItemContainer}
                  itemTextStyle={styles.dropdownItemText}
                  data={languages}
                  iconColor={colors.textPrimary}
                  maxHeight={300}
                  labelField="value"
                  valueField="key"
                  placeholder="Select item"
                  value={locationData?.language ?? 'en'}
                  onChange={async ({key}) => {
                    changeLanguage(key as keyof typeof LanguageLocale);
                    await setStorageData('language', key);
                    setRerender(state => state + 1);
                  }}
                />
              </View>
              {locationData?.city ? (
                <View style={styles.configSection}>
                  <BlurView
                    intensity={20}
                    tint={'dark'}
                    style={styles.blurView}
                  >
                    <FormattedText
                      font={'NunitoBold'}
                      style={styles.sectionTitle}
                    >
                      Location
                    </FormattedText>
                  </BlurView>
                  <View style={styles.informationWrapper}>
                    <Text
                      style={{color: 'white', textTransform: 'capitalize'}}
                      variant="titleMedium"
                    >
                      {locationData.city}
                    </Text>
                  </View>
                </View>
              ) : null}
              {locationData?.coord ? (
                <View style={styles.configSection}>
                  <BlurView
                    intensity={20}
                    tint={'dark'}
                    style={styles.blurView}
                  >
                    <FormattedText
                      font={'NunitoBold'}
                      style={styles.sectionTitle}
                    >
                      Position
                    </FormattedText>
                  </BlurView>
                  <View style={{...styles.positionWrapper, marginTop: 15}}>
                    <Text
                      style={{...styles.titlePosition, borderTopWidth: 4}}
                      variant="titleMedium"
                    >
                      Latitude
                    </Text>
                    <Text
                      style={{...styles.textPosition, borderTopWidth: 4}}
                      variant="titleMedium"
                    >
                      {locationData.coord.lat}
                    </Text>
                  </View>
                  <View style={{...styles.positionWrapper, marginBottom: 15}}>
                    <Text
                      style={{...styles.titlePosition, borderBottomWidth: 4}}
                      variant="titleMedium"
                    >
                      Longitude
                    </Text>
                    <Text
                      style={{...styles.textPosition, borderBottomWidth: 4}}
                      variant="titleMedium"
                    >
                      {locationData.coord.long}
                    </Text>
                  </View>
                </View>
              ) : null}
              <View style={styles.configSection}>
                <Button
                  icon={{source: 'autorenew', direction: 'rtl'}}
                  style={styles.button}
                  mode={'contained'}
                  onPress={async () => await setRenewLocationData()}
                >
                  <Text style={{color: 'white'}} variant={'titleSmall'}>
                    RENEW LOCATION DATA
                  </Text>
                </Button>
              </View>
            </View>
          )}
          {/*<Button*/}
          {/*  onPress={() => setIsShowConfigDialog(!isShowDialog)}*/}
          {/*>*/}
          {/*  Close*/}
          {/*</Button>*/}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 450,
  },
  border: {
    position: 'absolute',
    marginTop: '5%',
    width: '90%',
    height: '90%',
    marginBottom: '5%',
    borderWidth: 3,
    zIndex: 7,
    borderColor: colors.borderHighlight,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    width: '70%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 20,
    backgroundColor: colors.backgroundPrimary,
    zIndex: 10,
  },
  configSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  blurView: {
    width: '100%',
    backgroundColor: colors.backgroundPrimary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textTransform: 'uppercase',
    width: '50%',
    textAlign: 'center',
  },
  informationWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.borderPrimary,
    width: '80%',
    minHeight: 40,
    margin: 15,
    borderColor: colors.borderSecondary,
    borderWidth: 4,
  },
  positionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  titlePosition: {
    color: colors.textPrimary,
    width: '50%',
    backgroundColor: colors.borderPrimary,
    borderLeftWidth: 4,
    borderColor: colors.borderSecondary,
    paddingLeft: 10,
  },

  textPosition: {
    color: colors.textSecondary,
    backgroundColor: colors.borderPrimary,
    width: '50%',
    textAlign: 'center',
    borderColor: colors.borderSecondary,
    borderRightWidth: 4,
  },
  button: {
    borderRadius: 0,
    backgroundColor: colors.borderPrimary,
    width: '80%',
    color: colors.textPrimary,
    zIndex: 15,
    marginVertical: 15,
  },
  modalContainer: {
    backgroundColor: colors.backgroundPrimary,
    marginHorizontal: '10%',
    borderWidth: 20,
    borderColor: colors.borderPrimary,
  },
  dropdownItemContainer: {
    backgroundColor: colors.borderPrimary,
  },
  dropdownItemText: {
    color: colors.textSecondary,
  },
  textWhite: {
    color: colors.textPrimary,
  },
  configTitleText: {
    color: colors.textSecondary,
    fontSize: 18,
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.textPrimary,
    padding: 16,
  },
  dropdown: {
    marginVertical: 15,
    height: 40,
    backgroundColor: colors.borderPrimary,
    borderColor: colors.borderSecondary,
    color: colors.textPrimary,
    borderWidth: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.textPrimary,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     width: '100%',
//     height: 450,
//   },
//   border: {
//     position: 'absolute',
//     marginTop: '5%',
//     width: '90%',
//     height: '90%',
//     marginBottom: '5%',
//     borderWidth: 3,
//     zIndex: 7,
//     borderColor: '#bba274',
//   },
//   contentWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   title: {
//     display: 'flex',
//     justifyContent: 'center',
//     width: '70%',
//     alignItems: 'center',
//     paddingLeft: 10,
//     paddingTop: 10,
//     marginBottom: 20,
//     // alignSelf: 'stretch',
//     backgroundColor: '#7d683f',
//     zIndex: 10,
//   },
//   configSection: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   blurView: {
//     width: '100%',
//     backgroundColor: '#7d683f',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     color: secondColor,
//     fontSize: 14,
//     textTransform: 'uppercase',
//     width: '50%',
//     textAlign: 'center',
//   },
//   informationWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#9c8357', //'#d7b88e',
//     width: '80%',
//     minHeight: 40,
//     margin: 15,
//     borderColor: '#d7b88e', //'#9c8357',
//     borderWidth: 4,
//   },
//   positionWrapper: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '80%',
//   },
//   titlePosition: {
//     color: 'white',
//     width: '50%',
//     backgroundColor: '#9c8357',
//     borderLeftWidth: 4,
//     borderColor: '#d7b88e',
//     paddingLeft: 10,
//   },
//
//   textPosition: {
//     color: secondColor,
//     backgroundColor: '#9c8357',
//     width: '50%',
//     textAlign: 'center',
//     borderColor: '#d7b88e',
//     borderRightWidth: 4,
//   },
//   button: {
//     borderRadius: 0,
//     backgroundColor: '#9c8357',
//     width: '80%',
//     color: 'white',
//     zIndex: 15,
//     marginVertical: 15,
//   },
// });
//
// const dropdownStyles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   dropdown: {
//     marginVertical: 15,
//     height: 40,
//     backgroundColor: '#9c8357',
//     borderColor: '#d7b88e',
//     color: 'white',
//     borderWidth: 4,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: 'white',
//     textAlign: 'center',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
// });
