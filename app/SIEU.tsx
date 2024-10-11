import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';

export default function SafeInternetEmailUsage() {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Safe Internet and Email Usage</Text>

        <Text style={styles.sectionTitle}>Importance of Safe Internet and Email Usage</Text>
        <Text style={styles.content}>
          Browsing the internet and using email are common activities that can expose you to cyber threats if not done securely.
        </Text>

        <Text style={styles.sectionTitle}>Safe Browsing Practices</Text>
        <Text style={styles.content}>
          - Only visit HTTPS websites{'\n'}
          - Be cautious when downloading files from unknown sources{'\n'}
          - Avoid sharing sensitive information on unsecured websites
        </Text>

        <Text style={styles.sectionTitle}>Safe Email Practices</Text>
        <Text style={styles.content}>
          - Always verify the sender’s identity{'\n'}
          - Avoid downloading attachments from unknown senders{'\n'}
          - Beware of unsolicited offers or requests for personal information
        </Text>

        <Text style={styles.sectionTitle}>Risks of Unsecured Wi-Fi</Text>
        <Text style={styles.content}>
          - Using public Wi-Fi networks exposes your data to eavesdropping{'\n'}
          - Use a VPN to secure your connection
        </Text>

        <Pressable style={styles.quizButton}>
          <Link
            href={{
              pathname: "/QuizPage",
              params: { module: "SafeInternet" },
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
    width: '100%',
  },
  quizButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
