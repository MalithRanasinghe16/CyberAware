import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';

export default function DataPrivacyProtection() {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Data Privacy and Protection</Text>

        <Text style={styles.sectionTitle}>Importance of Data Privacy</Text>
        <Text style={styles.content}>
          Protecting sensitive personal and company data is critical to prevent identity theft and financial loss.
        </Text>

        <Text style={styles.sectionTitle}>How to Safeguard Data</Text>
        <Text style={styles.content}>
          - Use encryption to secure sensitive information{'\n'}
          - Limit data access to only those who need it{'\n'}
          - Avoid sharing personal information on social media
        </Text>

        <Text style={styles.sectionTitle}>Data Privacy Regulations</Text>
        <Text style={styles.content}>
          - Overview of regulations like GDPR and how they affect data handling{'\n'}
          - The importance of compliance with privacy laws in business settings
        </Text>

        <Text style={styles.sectionTitle}>Best Practices for Data Protection</Text>
        <Text style={styles.content}>
          - Regularly back up data{'\n'}
          - Use secure methods for data transfer and storage
        </Text>

        <Pressable style={styles.quizButton}>
          <Link
            href={{
              pathname: "/QuizPage",
              params: { module: "DataPrivacy" },
            }}
          >
            <Text style={styles.quizButtonText}>Take Quiz</Text>
          </Link>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  quizButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    width: '100%', // Make the button full width
  },
  quizButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
