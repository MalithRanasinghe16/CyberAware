// app/login.tsx
import React, { useState } from 'react';
import { ImageBackground, TextInput, View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Make sure Firebase is initialized in your project
import { firebaseApp } from '../Firebaseconfig'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);
    
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    
    try {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to next page after successful login
      Alert.alert('Success', 'Login successful!');
      router.replace('./getstratpage');
    } catch (error) {
      // Handle login error
      Alert.alert('Error', 'Failed to login. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/welcome-page.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.overlay}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {/* Use Pressable instead of Link for login button */}
        <Pressable onPress={handleLogin} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </Pressable>
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
    paddingTop: '50%', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
