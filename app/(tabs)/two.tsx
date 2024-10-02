import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";

// Placeholder data for Essentials and All Modules
const essentialsCourses = [
  {
    id: "1",
    title: "Cybersecurity Awareness",
    description: "Training Essentials",
    image: "",
  },
  {
    id: "2",
    title: "Phishing Attack Basics",
    description: "Phishing Module",
    image: "",
  },
  {
    id: "3",
    title: "Password Security",
    description: "Essential Module",
    image: "",
  },
];

const allModulesCourses = [
  {
    id: "1",
    title: "Social Engineering",
    description: "Security Awareness Essentials",
  },
  { id: "2", title: "Malware Detection", description: "Advanced Threats" },
  { id: "3", title: "Network Security", description: "Firewall Essentials" },
  { id: "4", title: "Email Phishing", description: "Phishing Prevention" },
  { id: "5", title: "Password Management", description: "Best Practices" },
];

export default function AllCoursesPage() {
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Search Bar */}
        <Text style={styles.learningText}>Learning</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search topic"
            placeholderTextColor="#BBB"
            style={styles.searchInput}
          />
        </View>

        {/* Essentials Section (Horizontal Scroll) */}
        <Text style={styles.sectionTitle}>The Essentials</Text>
        <FlatList
          data={essentialsCourses}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.essentialsCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.essentialsImage}
              />
              <Text style={styles.essentialsTitle}>{item.title}</Text>
              <Text style={styles.essentialsSubtitle}>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.essentialsList}
        />

        {/* All Modules Section (Vertical Scroll) */}
        <Text style={styles.sectionTitle}>All Modules</Text>
        <FlatList
          data={allModulesCourses}
          renderItem={({ item }) => (
            <View style={styles.moduleCard}>
              <Text style={styles.moduleTitle}>{item.description}</Text>
              <Text style={styles.moduleSubtitle}>{item.title}</Text>
              <Pressable style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Learning</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.modulesList}
        />
      </View>
     </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  learningText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    color: "#333",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  essentialsList: {
    paddingBottom: 10,
  },
  essentialsCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: Dimensions.get("window").width * 0.75,
  },
  essentialsImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  essentialsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  essentialsSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  modulesList: {
    paddingBottom: 20,
  },
  moduleCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  moduleSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
