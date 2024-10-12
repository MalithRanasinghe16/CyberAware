import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';

export default function PhishingSecurity() {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Phishing Awareness</Text>

        <Text style={styles.sectionTitle}>What is Phishing?</Text>
        <Text style={styles.content}>
          Phishing is a form of social engineering attack where attackers try to trick you into providing sensitive information (e.g., usernames, passwords, credit card numbers).
        </Text>

        <Text style={styles.sectionTitle}>Common Types of Phishing:</Text>
        <Text style={styles.content}>
          - *Email Phishing*: Fraudulent emails that seem legitimate{'\n'}
          - *Spear Phishing*: Targeted attacks tailored to specific individuals or organizations{'\n'}
          - *Smishing*: Phishing via SMS{'\n'}
          - *Vishing*: Phishing via phone calls
        </Text>

        <Text style={styles.sectionTitle}>Signs of a Phishing Attack:</Text>
        <Text style={styles.content}>
          - Suspicious sender addresses or URLs{'\n'}
          - Urgent language (e.g., “Your account will be suspended”){'\n'}
          - Unfamiliar or unexpected attachments or links
        </Text>

        <Text style={styles.sectionTitle}>How to Avoid Phishing Attacks:</Text>
        <Text style={styles.content}>
          - Always verify the sender{'\n'}
          - Avoid clicking on suspicious links{'\n'}
          - Report phishing emails to your IT department
        </Text>

        <Pressable style={styles.quizButton}>
          <Link
            href={{
              pathname: "/QuizPage",
              params: { module: "PhishingAwareness" },
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
