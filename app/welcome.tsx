// app/login.tsx
import React from 'react';
import { ImageBackground, TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <ImageBackground
      source={require('../assets/images/welcome-page.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.overlay}>
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
        <Link href="/getstratpage">
          <View>
            <Text style={styles.button}>Login</Text>
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
    paddingTop:'50%', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});
