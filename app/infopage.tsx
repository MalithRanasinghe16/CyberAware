import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, Image, Pressable, ImageBackground } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';

export default function SignUp() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.uri);
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
        </Pressable>

        {/* First Name Input */}
        <View style={styles.inputContainer}>
          <TextInput placeholder="First Name" style={styles.input} />
        </View>

        {/* Last Name Input */}
        <View style={styles.inputContainer}>
          <TextInput placeholder="Last Name" style={styles.input} />
        </View>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <TextInput placeholder="Username" style={styles.input} />
        </View>

        {/* Button */}
        <Pressable style={styles.button}>
          <Link href="/jobrall">
            <Text style={styles.buttonText}>Next</Text>
          </Link>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
