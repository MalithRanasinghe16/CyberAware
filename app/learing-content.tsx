import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Pressable,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Title } from "react-native-paper";

const LearningPage = ({ lessonId }) => {
  const [lessonContent, setLessonContent] = useState(null);
  const navigation = useNavigation();

  // Fetching the lesson details from the database based on lessonId
  useEffect(() => {
    const fetchLessonContent = async () => {
      const data = {
        title: "Social Engineering - Introduction",
        description:
          "Social engineering is the art of manipulating people so they give up confidential information...",
        articles: [
          {
            title: "Understanding Social Engineering",
            description:
              "An in-depth look into the tactics and strategies used in social engineering.",
            url: "",
          },
          {
            title: "How to Protect Against Social Engineering",
            description:
              "Learn effective strategies to safeguard your organization from social engineering attacks.",
            url: "",
          },
        ],
      };
      setLessonContent(data);
    };

    fetchLessonContent();
  }, [lessonId]);

  if (!lessonContent) {
    return <Text>Loading...</Text>;
  }

  const handleQuizNavigation = () => {
    // Navigate to the Quiz Page
    navigation.navigate("QuizPage", { lessonId });
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("(tabs)")}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{lessonContent.title}</Text>
        <Text style={styles.description}>{lessonContent.description}</Text>

        <View style={styles.referenceContainer}>
          {lessonContent.articles.map((article, index) => (
            <View key={index} style={styles.articleContainer}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleDescription}>
                {article.description}
              </Text>
              <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
                <Text style={styles.articleLink}>Read More</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Quiz Button */}
        <TouchableOpacity
          style={styles.quizButton}
          onPress={handleQuizNavigation}
        >
          <Text style={styles.quizButtonText}>Take the Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 10,
  },
  referenceContainer: {
    marginVertical: 20,
    marginTop: 30,
  },
  articleContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  articleLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  quizButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 50,
  },
  quizButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LearningPage;
