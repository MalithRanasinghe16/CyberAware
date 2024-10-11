import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import QuizPage from "./QuizPage";

export default function PasswordSecurity() {
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Introduction to Password Security</Text>
        <Text style={styles.content}>
          Passwords are the first line of defense in protecting personal and
          organizational data. Strong passwords help prevent unauthorized access
          to systems.
        </Text>

        <Text style={styles.sectionTitle}>
          Characteristics of a Strong Password:
        </Text>
        <Text style={styles.content}>
          - At least 12 characters long{"\n"}- Mix of uppercase and lowercase
          letters{"\n"}- Inclusion of numbers and special characters{"\n"}-
          Avoiding common words, names, and sequential patterns
        </Text>

        <Text style={styles.sectionTitle}>
          Best Practices for Password Management:
        </Text>
        <Text style={styles.content}>
          - Use a password manager to securely store passwords{"\n"}- Change
          passwords regularly{"\n"}- Avoid reusing passwords across multiple
          platforms
        </Text>

        <Text style={styles.sectionTitle}>
          Multi-Factor Authentication (MFA):
        </Text>
        <Text style={styles.content}>
          - What MFA is and how it adds an extra layer of security{"\n"}- Types
          of MFA (SMS codes, authentication apps, biometric verification)
        </Text>

        <Pressable style={styles.quizButton}>
          <Link
            href={{
              pathname: "/QuizPage",
              params: { module: "PasswordSecurity" },
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
    resizeMode: "cover",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  quizButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "100%", // Make the button full width
  },
  quizButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
