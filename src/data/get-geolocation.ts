import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AsyncStorageItems = 'location';

export const getStorageData = async (
  item: AsyncStorageItems,
): Promise<string | null> => {
  return AsyncStorage.getItem(item);
};
const setStorageData = async (
  key: AsyncStorageItems,
  value: string,
): Promise<any> => {
  return AsyncStorage.setItem(key, value);
};

export const getLocation = async (setLocation: (data: number[]) => void) => {
  let location = await getStorageData('location');
  if (!location) {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    const locationData = await Location.getCurrentPositionAsync({});
    setLocation([locationData.coords.latitude, locationData.coords.longitude]);
    await setStorageData(
      'location',
      JSON.stringify([
        locationData.coords.latitude,
        locationData.coords.longitude,
      ]),
    );
  }
  return setLocation(JSON.parse(location as string) || [50, 30]);
};
