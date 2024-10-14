import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, ImageBackground } from "react-native";
import quizData from "./quizData"; // Import your quiz data
import { useRoute } from "@react-navigation/native";
import { firebaseApp } from "../Firebaseconfig";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

const QuizPage = () => {
  const router = useRouter(); // Use useRouter to navigate
  const route = useRoute();
  const { module } = route.params as { module: string }; // Get the module name from route params

  const questions = quizData[module] || []; // Retrieve the questions based on the module
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (selectedOptionIndex: any) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOptionIndex === currentQuestion.answer) {
      setScore(score + 1); // Increment score if the answer is correct
    }

    // Move to the next question or show the final score
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore =
        score + (selectedOptionIndex === currentQuestion.answer ? 1 : 0);
      const points = finalScore * 10;
      updateUserScore(points);
      Alert.alert(
        "Quiz Completed",
        `Your score is: ${finalScore} out of ${questions.length}`,
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to the tabs page after quiz completion
              router.push({
                pathname: "/(tabs)",
                params: { completedModule: module },
              });
            },
          },
        ]
      );
    }
  };

  const updateUserScore = async (points: number) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    const userId = user.uid;
    const db = getFirestore(firebaseApp);
    const userRef = doc(db, 'userInfo', userId);
  
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const currentScore = userDoc.data().totalScore || 0;
        await setDoc(userRef, {
          totalScore: currentScore + points
        }, { merge: true });
      } else {
        await setDoc(userRef, { totalScore: points }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating score:", error);
      Alert.alert("Error", "Failed to update the score.");
    }
  };

  return ( 
  <ImageBackground
    source={require('../assets/images/bg.png')}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.title}>{module} Quiz</Text>
      {questions.length > 0 && (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Pressable
              key={index}
              style={styles.option}
              onPress={() => handleAnswer(index)}
            >
              <Text>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default QuizPage;
