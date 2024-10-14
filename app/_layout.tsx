import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native"; 
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Firebase auth import
import { firebaseApp } from '../Firebaseconfig';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Handle font loading errors
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Show nothing if fonts are not loaded yet
  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // To track auth state loading

  useEffect(() => {
    const auth = getAuth(firebaseApp);
  
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        console.log("No user is signed in.");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error during onAuthStateChanged:", error);
    });
  
    return () => unsubscribe();
  }, []);
  

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Conditional rendering based on user auth state
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        )} */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="getstratpage" options={{ headerShown: false }} />
        <Stack.Screen name="infopage" options={{ headerShown: false }} />
        <Stack.Screen name="jobrall" options={{ headerShown: false }} />
        <Stack.Screen name="PasswordSecurity" options={{ headerShown: false }} />
        <Stack.Screen name="PhishingAwareness" options={{ headerShown: false }} />
        <Stack.Screen name="SIEU" options={{ headerShown: false }} />
        <Stack.Screen name="DNS" options={{ headerShown: false }} />
        <Stack.Screen name="DPP" options={{ headerShown: false }} />
        <Stack.Screen name="QuizPage" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
