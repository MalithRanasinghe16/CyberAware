import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';

export default function DeviceNetworkSecurity() {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Device and Network Security</Text>

        <Text style={styles.sectionTitle}>Importance of Device and Network Security</Text>
        <Text style={styles.content}>
          Keeping devices secure helps protect against unauthorized access to systems and networks.
        </Text>

        <Text style={styles.sectionTitle}>Device Security Best Practices</Text>
        <Text style={styles.content}>
          - Install antivirus software{'\n'}
          - Keep software and firmware updated{'\n'}
          - Enable firewalls to block unauthorized traffic
        </Text>

        <Text style={styles.sectionTitle}>Securing Networks</Text>
        <Text style={styles.content}>
          - Always use secure Wi-Fi connections (avoid open, public Wi-Fi){'\n'}
          - Regularly update router firmware{'\n'}
          - Use strong network passwords
        </Text>

        <Text style={styles.sectionTitle}>How to Spot and Respond to Network Intrusions</Text>
        <Text style={styles.content}>
          - Identify unusual network behavior or unauthorized access{'\n'}
          - Report suspicious activity immediately
        </Text>

        <Pressable style={styles.quizButton}>
          <Link
            href={{
              pathname: "/QuizPage",
              params: { module: "DeviceNetwork" },
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
