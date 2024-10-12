import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // For the icon
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../Firebaseconfig';
import { router } from 'expo-router';

export default function SignUp() {
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [uploading, setUploading] = useState(false); // For handling upload state

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access media library is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const uploadUserData = async () => {
    if (!firstName || !lastName || !username || !image) {
      Alert.alert('Error', 'Please complete all fields and upload a profile picture.');
      return;
    }

    try {
      setUploading(true); // Set uploading state to true

      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'You are not logged in!');
        return;
      }

      const db = getFirestore(firebaseApp);
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);

      // Upload the profile picture to Firebase Storage
      const img = await fetch(image);
      const bytes = await img.blob();
      await uploadBytes(storageRef, bytes);

      // Get the image download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Save user data to Firestore under 'userInfo' collection
      await setDoc(doc(db, 'userInfo', user.uid), {
        firstName,
        lastName,
        username,
        profilePicture: imageUrl,
        email: user.email, // Save email for convenience
      });

      Alert.alert('Success', 'Profile created successfully!');
      router.replace('./jobrall');
    } catch (error) {
      console.error('Error uploading profile data:', error);
      Alert.alert('Error', 'Error creating profile');
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Profile Picture Section */}
        <Pressable onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.addPhotoText}>Add Profile Picture</Text>
          )}
          {/* Add the small camera icon */}
          <MaterialIcons name="add-a-photo" size={24} color="black" style={styles.cameraIcon} />
        </Pressable>

        {/* First Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Last Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Button */}
        <Pressable style={styles.button} onPress={uploadUserData} disabled={uploading}>
          <Text style={styles.buttonText}>
            {uploading ? 'Uploading...' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    position: 'relative', // For positioning the icon
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addPhotoText: {
    color: '#777',
    fontSize: 16,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 80,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 20,
    backgroundColor: '#936FA8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
