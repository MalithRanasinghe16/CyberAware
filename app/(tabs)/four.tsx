import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { getAuth, signOut, deleteUser, updateProfile } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseApp } from "../../Firebaseconfig";
import { router } from "expo-router";

const SettingsPage = ({ userEmail }: { userEmail: string }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [profileData, setProfileData] = useState(null);

  // Fetch profile picture URL from Firestore
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = getAuth(firebaseApp).currentUser?.uid;
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "userInfo", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
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

  // Handle logout
  const handleSignOut = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/welcome");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, { displayName: username });
      await updateDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
      });
      setIsEditProfileModalVisible(false);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    setIsDeleteAccountModalVisible(true); // Show confirmation modal
  };

  const confirmDeleteAccount = async () => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      // Delete user data except email
      await deleteDoc(doc(db, "users", user.uid));
      // Delete user from Firebase Authentication
      await deleteUser(user);
      setIsDeleteAccountModalVisible(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logout Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Feather name="log-out" size={24} color="white" />
        </TouchableOpacity>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profileData?.profilePicture }}
            style={styles.profilePic}
          />
          <Text style={styles.userEmail}>
            {userEmail || "Email not provided"}
          </Text>
        </View>

        {/* Account Sections */}
        <ScrollView style={styles.sectionsContainer}>
          {/* Edit Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsEditProfileModalVisible(true)}
            >
              <MaterialIcons name="account-circle" size={24} color="white" />
              <Text style={styles.optionText}>Profile Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={handleDeleteAccount}
            >
              <MaterialIcons name="delete" size={24} color="white" />
              <Text style={styles.optionText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Passkey and Other Sections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="vpn-key" size={24} color="white" />
              <Text style={styles.optionText}>Passkey</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="notifications" size={24} color="white" />
              <Text style={styles.optionText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="support" size={24} color="white" />
              <Text style={styles.optionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal
          visible={isEditProfileModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              style={styles.input}
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              style={styles.input}
            />
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              style={styles.input}
            />
            <Button title="Save" onPress={handleSaveProfile} />
            <Button
              title="Cancel"
              onPress={() => setIsEditProfileModalVisible(false)}
            />
          </View>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          visible={isDeleteAccountModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to delete your account?</Text>
            <Button title="Yes, Delete" onPress={confirmDeleteAccount} />
            <Button
              title="Cancel"
              onPress={() => setIsDeleteAccountModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  signOutButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#ddd",
    marginRight: 20,
  },
  userEmail: {
    marginTop: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  sectionsContainer: {
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
});

export default SettingsPage;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
