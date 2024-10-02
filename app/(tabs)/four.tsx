import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons'; // Icons for sign-out and other sections

const SettingsPage = ({ profilePictureUrl, userEmail, onSignOut }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')} // Your background image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Sign-out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={onSignOut}>
          <Feather name="log-out" size={24} color="white" />
        </TouchableOpacity>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profilePictureUrl }} // Retrieve this URL from the database
            style={styles.profilePic}
          />
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        {/* Account Sections */}
        <ScrollView style={styles.sectionsContainer}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="account-circle" size={24} color="white" />
              <Text style={styles.optionText}>Profile Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="delete" size={24} color="white" />
              <Text style={styles.optionText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Passkey Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="vpn-key" size={24} color="white" />
              <Text style={styles.optionText}>Passkey</Text>
            </TouchableOpacity>
          </View>

          {/* Notifications & Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="notifications" size={24} color="white" />
              <Text style={styles.optionText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="support" size={24} color="white" />
              <Text style={styles.optionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  signOutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  userEmail: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  sectionsContainer: {
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default SettingsPage;
