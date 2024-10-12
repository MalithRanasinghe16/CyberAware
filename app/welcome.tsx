import React, { useState } from 'react';
import { ImageBackground, TextInput, View, Text, StyleSheet, Alert, Pressable, Switch, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { firebaseApp } from '../Firebaseconfig';
import { FirebaseError } from 'firebase/app';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const router = useRouter();
  const db = getFirestore(firebaseApp); // Initialize Firestore

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    if (!isChecked) {
      Alert.alert('Error', 'Please accept the rules and regulations.');
      return;
    }

    setLoading(true);

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user profile data is in Firestore
      const userDocRef = doc(db, 'userInfo', user.uid); // Assuming 'users' collection
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        // Check if the user's profile is complete (first name, last name, username, profile picture)
        const { firstName, lastName, username, profilePic } = userData;

        if (firstName || lastName || username || profilePic) {
          // If any required data is missing, navigate to getstartpage
          router.push('./(tabs)');
          
        } else {
          // If profile data is complete, navigate to the (tabs) page
          router.replace('./getstratpage');
        }
      } else {
        // If no user data exists in Firestore, navigate to getstartpage
        router.replace('./getstratpage');
      }

    } catch (error) {
      const firebaseError = error as FirebaseError;
      let errorMessage = 'Failed to login. Please check your credentials.';
      if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (firebaseError.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      }

      Alert.alert('Error', errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/welcome-page.png')} style={styles.background} resizeMode="cover">
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
        {/* Checkbox for Terms and Conditions */}
        <View style={styles.checkboxContainer}>
          <Switch value={isChecked} onValueChange={setIsChecked} />
          <Text style={styles.label}>I accept the rules and regulations</Text>
        </View>
        {/* Login Button */}
        <Pressable onPress={handleLogin} style={styles.buttonContainer} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>
        {/* Forgot Password Button */}
        <Link href="./forgotPassword" style={styles.forgotPasswordText}>Forgot Password?</Link>
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
    paddingTop: '80%',
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: '#007AFF',
    fontSize: 16,
  },
});
