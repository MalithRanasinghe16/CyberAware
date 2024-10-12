import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { getAuth, confirmPasswordReset } from 'firebase/auth'; 
import { firebaseApp } from '../Firebaseconfig'; 
import { router } from 'expo-router';
import { RouteProp } from '@react-navigation/native'; 

type RootStackParamList = {
  CreateNewPassword: { resetCode: string }; 
};

type CreateNewPasswordRouteProp = RouteProp<RootStackParamList, 'CreateNewPassword'>;

interface Props {
  route: CreateNewPasswordRouteProp;
}

export default function CreateNewPassword({ route }: Props) {
  const [newPassword, setNewPassword] = useState<string>('');
  const auth = getAuth(firebaseApp);
  const { resetCode } = route.params; 

  // Password validation function
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordUpdate = async () => {
    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Error',
        'Password must contain at least 8 characters, with at least one uppercase, one lowercase, one number, and one special character.'
      );
      return;
    }

    try {
      await confirmPasswordReset(auth, resetCode, newPassword);
      Alert.alert('Success', 'Your password has been updated. You can now log in.');
      router.navigate('./welcome   '); 
    } catch (error: any) {
      Alert.alert('Error', 'Failed to update password. Please try again.');
      console.error('Error updating password:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <Pressable onPress={handlePasswordUpdate} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Update Password</Text>
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
