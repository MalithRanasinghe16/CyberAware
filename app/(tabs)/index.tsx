import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../Firebaseconfig";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Link, router } from "expo-router";

interface RouteParams {
  completedModule: string; // or any other type you expect
}
interface ProfileData {
  totalScore: number;
  rankingPercentage: number;
}
export default function HomePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { completedModule } = (route.params as RouteParams) || {};
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allModulesCourses, setAllModulesCourses] = useState([]);

  // Fetch user profile data from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = getAuth(firebaseApp).currentUser?.uid ?? "default-user-id";
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "userInfo", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const totalScore = userData.totalScore || 0;
          const rankingPercentage = (totalScore / 150) * 100; 

          setProfileData({
            ...userData,
            rankingPercentage: rankingPercentage,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const navigateToQuiz = (module: any) => {
    let quizLink;

    // Determine the quiz link based on the module name
    switch (module) {
      case "PasswordSecurity":
        quizLink = "/QuizPage?module=PasswordSecurity";
        break;
      case "PhishingAwareness":
        quizLink = "/QuizPage?module=PhishingAwareness";
        break;
      case "SafeInternet":
        quizLink = "/QuizPage?module=SafeInternet";
        break;
      case "DataPrivacy":
        quizLink = "/QuizPage?module=SafeInternet";
        break;
      case "DeviceNetwork":
        quizLink = "/QuizPage?module=SafeInternet";
        break;

      default:
        console.log("No quiz found for this module");
        return;
    }

    // Navigate to the quiz page
    router.push(quizLink);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Profile Picture and Ranking */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profileData?.profilePicture }}
            style={styles.profilePicture}
          />
          <View style={styles.rankingContainer}>
            <Text style={styles.rankingText}>Ranking</Text>
            <View style={styles.rankBar}>
              <View
                style={[
                  styles.rankFill,
                  { width: `${profileData?.rankingPercentage || 0}%` }, 
                ]}
              />
            </View>
          </View>
        </View>

        {/* Completed Module Section */}
        {completedModule ? (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>
              Completed Module: {completedModule}
            </Text>
            <Pressable
              style={styles.continueButton}
              onPress={() => navigateToQuiz(completedModule)}
            >
              <Text style={styles.continueButtonText}>Take Quiz again</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.instructionsText}>
            Complete a quiz to see your completed modules!
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
    marginRight: 20,
  },
  rankingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rankingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  rankBar: {
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 5,
    overflow: "hidden",
  },
  rankFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  completedContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20,
  },
  completedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modulesList: {
    marginTop: 20,
  },
  moduleCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  moduleSubtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
});
