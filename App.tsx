import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [kaupunki, setKaupunki] = useState('');
  const [lampo, setLampo] = useState(null);
  
  const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY; //otetaan api avain .env tiedostosta

  const haeTiedot = async () => { //funkio jolla haetaan data
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setLampo(data.main.temp); //laitetaan apin mukaan lampo
    } catch (error) {
      alert("Virhe haussa"); //näytetään error jos haettu kaupunki ei löydyu
    }
  };

  return (
   <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Syötä kaupunki"
        value={kaupunki}
        onChangeText={setKaupunki}
      />
      <Button title="Hae" onPress={haeTiedot} />
      {lampo !== null && (
        <Text 
        style={styles.result}>
        {kaupunki} lämpötila: {lampo} °C
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});
