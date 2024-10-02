// app/login.tsx
import React from 'react';
import { ImageBackground, TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <ImageBackground
      source={require('../assets/images/getstart-page.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.overlay}>
        <Link href="/infopage">
          <View>
            <Text style={styles.button}>Get Start</Text>
          </View>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  overlay: {
    flex: 1,
    paddingTop:'150%', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});
