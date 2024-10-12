import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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
        headerShown: useClientOnlyValue(false, true),
       
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>  <Ionicons name="home-outline" size={24} color="black" />,
          headerShown:false,
        
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Learning',
          tabBarIcon: ({ color }) => <Entypo name="open-book" size={24} color="black" />,
          headerShown:false,
        }}
      />
       <Tabs.Screen
        name="three"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color }) => <FontAwesome6 name="ranking-star" size={24} color="black" />,
          headerShown:false,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Setings',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color="black" />,
          headerShown:false,
        }}
      />
    </Tabs>
  );
}
