import React from 'react';
import { Text, View, StyleSheet, Pressable, ImageBackground, FlatList } from 'react-native';
import { Link } from 'expo-router';

const roles = ["Lecturer", "Student", "Admin", "Researcher"]; // You can add more roles

export default function JobRolePage() {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>What's Your Role?</Text>

        {/* Role Selection */}
        <FlatList
          data={roles}
          renderItem={({ item }) => (
            <Pressable style={styles.roleButton}>
              <Text style={styles.roleButtonText}>{item}</Text>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.rolesList}
        />

        {/* Next Button */}
        <Pressable style={styles.button}>
          <Link href="/(tabs)"> {/* Replace with actual route */}
            <Text style={styles.buttonText}>Confirm</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  rolesList: {
    width: '100%',
    alignItems: 'center',
  },
  roleButton: {
    backgroundColor: '#9F9DDB',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  roleButtonText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
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
