import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseApp } from '../Firebaseconfig'; 
import { router } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const auth = getAuth(firebaseApp);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', `Password reset email has been sent to ${email}. Please check your inbox.`);
      router.navigate('./newpasswordcreation');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Email not found. Please check and try again.');
      } else {
        Alert.alert('Error', 'Failed to send reset email. Please try again.');
        console.error('Error sending reset email:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Pressable onPress={handlePasswordReset} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Send Password Reset Email</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
