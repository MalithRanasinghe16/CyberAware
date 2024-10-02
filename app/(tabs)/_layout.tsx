import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false,
        
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Learning',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false,
        }}
      />
       <Tabs.Screen
        name="three"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Setings',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown:false,
        }}
      />
    </Tabs>
  );
}
