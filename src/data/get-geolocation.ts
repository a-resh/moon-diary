import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cities} from './cities';

type AsyncStorageItems = 'location' | 'city' | 'language';

export const getStorageData = async (
  item: AsyncStorageItems,
): Promise<string | null> => {
  return AsyncStorage.getItem(item);
};
export const setStorageData = async (
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

    const {
      coords: {longitude, latitude},
    } = await Location.getCurrentPositionAsync({});
    setLocation([latitude, longitude]);
    await setStorageData('location', JSON.stringify([latitude, longitude]));
    await setStorageData('city', getCityByCoordinate(latitude, longitude));
  }
  return setLocation(JSON.parse(location as string) || [50, 30]);
};

export const getCityByCoordinate = (
  latitude: number,
  longitude: number,
): string => {
  let city = 'Kyiv';
  let diffLat = 180;
  let diffLon = 180;
  let llat = 0;
  let llong = 0;
  cities.data.forEach(({l: [long, lat], n}) => {
    if (!lat || !long) return;
    const tempDiffLat = Math.abs(Math.abs(lat) - Math.abs(latitude));
    const tempDiffLon = Math.abs(Math.abs(long) - Math.abs(longitude));
    if (
      diffLat > tempDiffLat &&
      diffLon > tempDiffLon &&
      Math.sign(latitude) === Math.sign(lat) &&
      Math.sign(longitude) === Math.sign(long)
    ) {
      diffLon = tempDiffLon;
      diffLat = tempDiffLat;
      city = n;
      llong = long;
      llat = lat;
    }
  });
  return city;
};
