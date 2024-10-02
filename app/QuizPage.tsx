import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

const QuizPage = ({ route }: { route: RouteProp<Record<string, { lessonId: string }>> })=> {
  const { lessonId } = route.params; // Get lessonId passed from LearningPage
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
  const navigation = useNavigation();
  type Question = {
    id: number;
    question: string;
    options: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined)[];
  };
  

  // Fetching questions from the database based on lessonId
  useEffect(() => {
    const fetchQuestions = async () => {
      const data = [
        { id: 1, question: 'What is social engineering?', options: ['Manipulating users', 'Coding', 'Hacking', 'None of the above'], answer: 0 },
        { id: 2, question: 'Which is a common social engineering tactic?', options: ['Phishing', 'Debugging', 'Encrypting', 'All of the above'], answer: 0 },
        { id: 3, question: 'What should you do if you receive a suspicious email?', options: ['Open it', 'Delete it', 'Ignore it', 'Forward it'], answer: 1 },
        { id: 4, question: 'Social engineering relies heavily on:', options: ['Technology', 'Psychology', 'Encryption', 'None of the above'], answer: 1 },
        { id: 5, question: 'What is phishing?', options: ['A type of fish', 'A social engineering attack', 'A programming language', 'None of the above'], answer: 1 }
      ];
      setQuestions(data);
    }
    const [questions, setQuestions] = useState<Question[]>([]);

    fetchQuestions();
  }, [lessonId]);

  const handleAnswer = (questionIndex: number, answerIndex: any) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    if (questions.length === 0) return; 
  
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].answer ? 1 : 0);
    }, 0);
    // ...
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')} 
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Quiz</Text>

        {questions.map((question, index) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{`${index + 1}. ${question.question}`}</Text>
            {question.options.map((option: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, optionIndex: React.Key | null | undefined) => (
              <TouchableOpacity
                key={optionIndex}
                style={userAnswers[index] === optionIndex ? styles.selectedOption : styles.option}
                onPress={() => handleAnswer(index, optionIndex)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.submitButton} onPress={calculateScore}>
          <Text style={styles.submitButtonText}>Submit Answers</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default QuizPage;
