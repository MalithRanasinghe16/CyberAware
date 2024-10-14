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
  GestureResponderEvent,
  Alert,
} from "react-native";
import { MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getAuth, signOut, deleteUser, updateProfile } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../../Firebaseconfig";
import { router } from "expo-router";

const SettingsPage = () => {
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
    useState(false);
  const [isPrivacyPolicyModalVisible, setIsPrivacyPolicyModalVisible] =
    useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [profileData, setProfileData] = useState<{
    username: string;
    lastName: string;
    firstName: string;
    profilePicture: string;
  } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fetch profile data (email & profile picture) from Firebase
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;

        if (user) {
          setUserEmail(user.email);

          const userId = user.uid;
          const db = getFirestore(firebaseApp);
          const docRef = doc(db, "userInfo", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfileData(userData as { profilePicture: string });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    if (profileData) {
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
      setUsername(profileData.username || "");
    }
    setIsEditProfileModalVisible(true);
  };

  // Handle image picker to change profile picture
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const auth = getAuth(firebaseApp);
      const storage = getStorage(firebaseApp);
      const user = auth.currentUser;

      if (user && result.assets && result.assets[0].uri) {
        const uri = result.assets[0].uri;
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Update the Firestore document with the new profile picture URL
        const db = getFirestore(firebaseApp);
        await updateDoc(doc(db, "userInfo", user.uid), {
          profilePicture: downloadURL,
        });

        // Update profileData to display the new image immediately
        setProfileData({ profilePicture: downloadURL });
      }
    }
  };

  // Handle logout
  const handleSignOut = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        router.push("/welcome");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const handleRequestDelete = () => {
    // Ask for a final confirmation before deletion
    Alert.alert(
      "Confirm Account Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Delete", onPress: handleDeleteAccount },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;

      if (user) {
        // Delete user account from Firebase Authentication
        await deleteUser(user);

        // Optionally: Remove user data from Firestore
        const db = getFirestore(firebaseApp);
        await deleteDoc(doc(db, "userInfo", user.uid));

        // Redirect or give feedback
        router.push("/welcome"); // Navigate to a welcome or login screen
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    }
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const user = auth.currentUser;

    if (user) {
      // Update Firebase Authentication Profile
      await updateProfile(user, { displayName: username });

      // Update Firestore User Data
      await updateDoc(doc(db, "userInfo", user.uid), {
        firstName,
        lastName,
        username,
      });

      // Close modal after saving
      setIsEditProfileModalVisible(false);

      // Optionally, display a success message or handle UI feedback
      alert("Profile updated successfully!");
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

        {/* Profile Picture with Edit Icon */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureWrapper}>
            <Image
              source={{
                uri:
                  profileData?.profilePicture || "default-profile-picture-url",
              }}
              style={styles.profilePic}
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handlePickImage}
            >
              <FontAwesome name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userEmail}>
            {userEmail || "Email not provided"}
          </Text>
        </View>

        {/* Account Sections */}
        <ScrollView style={styles.sectionsContainer}>
          {/* Edit Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
              <MaterialIcons name="account-circle" size={24} color="white" />
              <Text style={styles.optionText}>Profile Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsDeleteAccountModalVisible(true)}
            >
              <MaterialIcons name="delete" size={24} color="white" />
              <Text style={styles.optionText}>Request to Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Security Sections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>

            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsPrivacyPolicyModalVisible(true)}
            >
              <MaterialIcons name="lock" size={24} color="white" />
              <Text style={styles.optionText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => setIsTermsModalVisible(true)} // Open modal on press
            >
              <MaterialIcons name="assignment" size={24} color="white" />
              <Text style={styles.optionText}>Terms and Conditions</Text>
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
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {/* Pre-fill the inputs with current profile information */}
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

            {/* Save Button */}
            <Button title="Save Changes" onPress={handleSaveProfile} />

            {/* Cancel Button */}
            <View style={{ marginTop: 10 }}>
              <Button
                title="Cancel"
                onPress={() => setIsEditProfileModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          visible={isDeleteAccountModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text style = {styles.modalTitle}>Are you sure you want to request account deletion?</Text>
            <View style={{ marginTop: 10 }}>
            <Button
              title="Request Account Deletion"
              onPress={handleRequestDelete}
            />
            </View>
            <View style={{ marginTop: 10 }}>
            <Button
              title="Cancel"
              onPress={() => setIsDeleteAccountModalVisible(false)}
            />
            </View>
           
          </View>
        </Modal>
        {/* Privacy Policy Modal */}
        <Modal
          visible={isPrivacyPolicyModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setIsPrivacyPolicyModalVisible(false)}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.policyText}>
                Welcome to the CyberAware: Employee Security Awareness App
                (referred to as "the App"). This privacy policy outlines how we
                collect, use, and protect the personal information of our users.
                By using the App, you agree to the collection and use of
                information in accordance with this policy.
              </Text>
              <Text style={styles.policySectionTitle}>
                2. Information We Collect
              </Text>
              <Text style={styles.policyText}>
                - Personal Information: We collect information that you provide
                when registering for the App, such as your name, email address,
                and contact details. - Usage Data: The App may collect
                information on how the service is accessed and used, including
                device type, app interactions, and pages visited. - Compliance
                Data: Information related to your engagement with security
                training modules, policy acknowledgment, and assessments.
              </Text>
              <Text style={styles.policySectionTitle}>
                3. How We Use Your Information
              </Text>
              <Text style={styles.policyText}>
                - To manage your account and provide you with access to the
                App's features. - To monitor compliance with security policies
                and track completion of training. - To enhance the security and
                functionality of the App through updates and improvements. - To
                notify you of any changes in policies or App features.
              </Text>
              <Text style={styles.policySectionTitle}>4. Data Security</Text>
              <Text style={styles.policyText}>
                Your personal information is stored securely, and access is
                limited to authorized personnel. We use encryption and secure
                authentication measures to protect your data. However, no method
                of transmission over the internet is entirely secure, and we
                cannot guarantee absolute security.
              </Text>
              <Text style={styles.policySectionTitle}>5. Data Sharing</Text>
              <Text style={styles.policyText}>
                We do not share your personal information with third parties,
                except: - To comply with legal obligations. - To protect the
                rights and safety of VIIT and its users. - With service
                providers who support the operation of the App, bound by
                confidentiality agreements.
              </Text>
              <Text style={styles.policySectionTitle}>6. Data Retention</Text>
              <Text style={styles.policyText}>
                We retain personal data only as long as necessary to fulfill the
                purposes for which it was collected, or as required by law.
              </Text>
              <Text style={styles.policySectionTitle}>7. Your Rights</Text>
              <Text style={styles.policyText}>
                You have the right to: - Access and update your personal
                information. - Request the deletion of your data. - Withdraw
                consent for data collection and processing at any time.
              </Text>
              <Text style={styles.policySectionTitle}>8. Amendments</Text>
              <Text style={styles.policyText}>
                We may update this privacy policy periodically. Users will be
                notified of any significant changes, and continued use of the
                App constitutes acceptance of the updated policy.
              </Text>
              <Text style={styles.policySectionTitle}>
                9. Contact Information
              </Text>
              <Text style={styles.policyText}>
                For questions or concerns about this privacy policy, please
                contact us at: [Insert Contact Information]
              </Text>
            </ScrollView>
          </View>
        </Modal>

        {/* Terms and Conditions Modal */}
        <Modal
          visible={isTermsModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setIsTermsModalVisible(false)}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.policyText}>1. Introduction</Text>
              <Text style={styles.policyText}>
                These terms and conditions govern the use of the CyberAware:
                Employee Security Awareness App (referred to as "the App"). By
                accessing or using the App, you agree to comply with these
                terms.
              </Text>
              <Text style={styles.policySectionTitle}>
                2. User Responsibilities
              </Text>
              <Text style={styles.policyText}>
                - Users must provide accurate and up-to-date information during
                registration. - Access to the App is for authorized users only.
                Sharing login credentials is strictly prohibited. - Users are
                required to regularly review and acknowledge security policies
                through the App.
              </Text>
              <Text style={styles.policySectionTitle}>3. Acceptable Use</Text>
              <Text style={styles.policyText}>
                The App is intended for enhancing security awareness and
                managing policy compliance within VIIT. Unauthorized use,
                including attempts to bypass security controls or use the App
                for personal gain, is prohibited.
              </Text>
              <Text style={styles.policySectionTitle}>4. User Data</Text>
              <Text style={styles.policyText}>
                By using the App, you agree to the collection and processing of
                personal and usage data as described in the Privacy Policy. You
                are responsible for ensuring the security of your account
                credentials.
              </Text>
              <Text style={styles.policySectionTitle}>
                5. Compliance and Training
              </Text>
              <Text style={styles.policyText}>
                Users are required to complete assigned training modules and
                assessments within the provided deadlines. The App will monitor
                compliance, and users will be notified of non-compliance issues.
              </Text>
              <Text style={styles.policySectionTitle}>
                6. Intellectual Property
              </Text>
              <Text style={styles.policyText}>
                All content within the App, including training materials,
                policies, and assessments, is the intellectual property of
                Vision Institute of Information Technology (VIIT). You may not
                copy, distribute, or use the content for any purpose other than
                its intended use within the App.
              </Text>
              <Text style={styles.policySectionTitle}>
                7. Limitation of Liability
              </Text>
              <Text style={styles.policyText}>
                VIIT is not liable for any damages arising from the use of the
                App, including, but not limited to, data loss, unauthorized
                access, or technical failures.
              </Text>
              <Text style={styles.policySectionTitle}>8. Termination</Text>
              <Text style={styles.policyText}>
                VIIT reserves the right to suspend or terminate access to the
                App for users found in violation of these terms. This includes
                non-compliance with security policies, misuse of the App, or any
                other breach of the terms.
              </Text>
              <Text style={styles.policySectionTitle}>9. Amendments</Text>
              <Text style={styles.policyText}>
                These terms may be updated periodically. Users will be notified
                of any changes, and continued use of the App after updates will
                constitute acceptance of the new terms.
              </Text>
              <Text style={styles.policySectionTitle}>
                10. Contact Information
              </Text>
              <Text style={styles.policyText}>
                For any questions or concerns regarding these terms and
                conditions, please contact: [Insert Contact Information]
              </Text>
            </ScrollView>
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
  profilePictureWrapper: {
    position: "relative",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#ddd",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 50,
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
    marginBottom: 40,
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 5,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
  scrollContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  policyText: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  policySectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
});

export default SettingsPage;
