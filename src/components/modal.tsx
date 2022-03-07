import React, {useState} from 'react';
import {
  Alert,
  Modal as RModal,
  StyleSheet,
  Text,
  Pressable,
  View,
  AsyncStorage,
} from 'react-native';
import {AutocompleteInput} from 'react-native-autocomplete-input';
// @ts-ignore
//import cities from '../data/getCities';

// @ts-ignore
//console.log(cities);
// import cities from 'all-the-cities';

export const Modal: React.FC<{
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}> = ({isVisible, setIsVisible}) => {
  const [inputValue, setInputValue] = useState('');
  const onCityInput = (city: string) => {
    setInputValue(city);
    console.log(city);
    // console.log(cities.filter(c => c.name.match(city)));
  };
  return (
    <RModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <AutocompleteInput
            data={[]}
            value={inputValue}
            onChangeText={text => onCityInput(text)}
            flatListProps={{
              // keyExtractor: (_, idx) => idx,
              renderItem: ({item}) => <Text>{item}</Text>,
            }}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </RModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 300,
    height: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
