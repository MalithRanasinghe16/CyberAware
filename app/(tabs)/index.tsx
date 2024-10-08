import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Pressable, ImageBackground, ActivityIndicator, Modal, Alert } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../Firebaseconfig';

const enrolledCourses = [
  { title: "Social Engineering", description: "Security Awareness Essentials" },
  { title: "Email Phishing", description: "Phishing" },
];

export default function HomePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizVisible, setQuizVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    { question: "What is phishing?", options: ["An attack method", "A harmless activity"], correct: 0 },
    { question: "How do you detect phishing?", options: ["Suspicious links", "Safe websites"], correct: 0 },
  ];

  // Fetch user profile data from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = getAuth(firebaseApp).currentUser?.uid;
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, 'userInfo', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
      setQuizVisible(false);
      updateRanking(score + 1);
    }
  };

  const updateRanking = async (finalScore: number) => {
    try {
      const userId = getAuth(firebaseApp).currentUser?.uid;
      const db = getFirestore(firebaseApp);
      const userRef = doc(db, 'userInfo', userId);

      const rankingPercentage = (finalScore / quizQuestions.length) * 100;

      await updateDoc(userRef, { rankingPercentage });
      Alert.alert('Ranking updated', `Your score is ${finalScore}/5!`);
    } catch (error) {
      console.error('Error updating ranking:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={styles.background}>
      <View style={styles.container}>

        {/* Profile Picture and Ranking */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: profileData?.profilePicture }} style={styles.profilePicture} />
          <View style={styles.rankingContainer}>
            <Text style={styles.rankingText}>Ranking</Text>
            <View style={styles.rankBar}>
              <View style={[styles.rankFill, { width: `${profileData?.rankingPercentage || 0}%` }]} />
            </View>
          </View>
        </View>

        {/* Enrolled Courses */}
        <Text style={styles.enrolledText}>Current Enrolled Courses</Text>
        <FlatList
          data={enrolledCourses}
          renderItem={({ item }) => (
            <View style={styles.courseContainer}>
              <Text style={styles.courseTitle}>{item.description}</Text>
              <Text style={styles.courseSubtitle}>{item.title}</Text>
              <Pressable style={styles.continueButton} onPress={() => setQuizVisible(true)}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.coursesList}
        />

        {/* Quiz Modal */}
        <Modal visible={quizVisible} transparent={true}>
          <View style={styles.quizOverlay}>
            {!quizFinished ? (
              <>
                <Text style={styles.quizQuestion}>{quizQuestions[currentQuestion].question}</Text>
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Pressable key={index} onPress={() => handleAnswer(index)} style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>{option}</Text>
                  </Pressable>
                ))}
              </>
            ) : (
              <Text style={styles.quizFinishedText}>Quiz Completed!</Text>
            )}
          </View>
        </Modal>

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
    paddingTop: 50,
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
    marginTop: 30,
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
  quizOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  quizQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  quizOption: {
    padding: 15,
    backgroundColor: '#4CAF50',
    marginBottom: 10,
    borderRadius: 10,
  },
  quizOptionText: {
    color: '#fff',
    fontSize: 18,
  },
  quizFinishedText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
