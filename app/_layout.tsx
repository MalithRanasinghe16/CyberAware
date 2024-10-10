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
import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase auth
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
  const [user, setUser] = useState<User | null>(null); // Hold the authenticated user state
  const [loading, setLoading] = useState(true); // Loading state for auth check
  
  useEffect(() => {
    const auth = getAuth(firebaseApp);

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); // Set the user based on auth state
      setLoading(false); // Stop loading once the auth state is checked
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // Optionally, you can return a splash screen or loading spinner here
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* If user is logged in, show the (tabs) page, else show the welcome page */}
        {!user ? (
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
        
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="getstratpage" options={{ headerShown: false }} />
        <Stack.Screen name="infopage" options={{ headerShown: false }} />
        <Stack.Screen name="jobrall" options={{ headerShown: false }} />
        <Stack.Screen name="PasswordSecurity" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
