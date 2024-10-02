import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, ImageBackground, ActivityIndicator } from 'react-native';

const enrolledCourses = [
  { title: "Social Engineering", description: "Security Awareness Essentials" },
  { title: "Email Phishing", description: "Phishing" },
];

export default function HomePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data from the database (replace with your API endpoint)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(''); // Replace with your API endpoint
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')} 
      style={styles.background}
    >
      <View style={styles.container}>

        {/* Profile Picture and Ranking */}
        <View style={styles.profileContainer}>
          <Image
            // source={{ uri: profileData?.profilePicture }} 
            style={styles.profilePicture}
          />
          <View style={styles.rankingContainer}>
            <Text style={styles.rankingText}>Ranking</Text>
            <View style={styles.rankBar}>
              {/* <View style={[styles.rankFill, { width: `${profileData?.rankingPercentage}%` }]} />  */}
            </View>
          </View>
        </View>

        {/* Enrolled Courses */}
        <Text style={styles.enrolledText}>Current Enroll courses</Text>
        <FlatList
          data={enrolledCourses}
          renderItem={({ item }) => (
            <View style={styles.courseContainer}>
              <Text style={styles.courseTitle}>{item.description}</Text>
              <Text style={styles.courseSubtitle}>{item.title}</Text>
              <Pressable style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.coursesList}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop:50
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
    marginRight: 20,
  },
  rankingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rankingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  rankBar: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginTop: 5,
    overflow: 'hidden',
  },
  rankFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  enrolledText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop:30
  },
  coursesList: {
    paddingBottom: 20,
  },
  courseContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
