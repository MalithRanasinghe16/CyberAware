import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth
import { firebaseApp } from "../Firebaseconfig"; // Firebase initialization file

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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const auth = getAuth(firebaseApp);

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser); // Set the user if logged in
      } else {
        setUser(null); // User is not logged in
      }
      setLoading(false); // Stop loading once the auth state is checked
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // You can show a loading spinner or splash screen here
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* If user is logged in, show the (tabs) page, else show the welcome page */}
        {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="getstratpage" options={{ headerShown: false }} />
        <Stack.Screen name="infopage" options={{ headerShown: false }} />
        <Stack.Screen name="jobrall" options={{ headerShown: false }} />
        <Stack.Screen name="learing-content" options={{ headerShown: false }} />
        <Stack.Screen name="QuizPage" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
