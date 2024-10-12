import { Href, Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TextInput, Dimensions, Image, FlatList } from 'react-native';

export default function AllCoursesPage() {
  // Placeholder data for Essentials and All Modules
  const essentialsCourses = [
    {
      id: '1',
      title: 'Password Security',
      description: 'Introduction to Password Security',
      image: require('../../assets/images/PasswordSecNEW.png'),
      link: '../PasswordSecurity',
    },
    {
      id: '2',
      title: 'Phishing Awareness',
      description: 'Phishing Module',
      image: require('../../assets/images/PhishingNEW.png'),
      link: '../PhishingAwareness',
    },
    {
      id: '3',
      title: 'Safe Internet and Email Usage',
      description: 'Safe Internet and Email Usage',
      image: require('../../assets/images/SafeInternetNEW.png'),
      link: '../SIEU',
    },
  ];

  const allModulesCourses = [
    {
      id: '1',
      title: 'Introduction to Password Security',
      subtitle: 'Password Security',
      link: '../PasswordSecurity',
    },
    {
      id: '2',
      title: 'Phishing Awareness',
      subtitle: 'Introduction to Phishing Awareness',
      link: '../PhishingAwareness',
    },
    {
      id: '3',
      title: 'Safe Internet and Email Usage',
      subtitle: 'Introduction to Safe Internet and Email Usage',
      link: '../SIEU',
    },
    {
      id: '4',
      title: 'Data Privacy and Protection',
      subtitle: 'Full introduction to Data Privacy and Protection',
      link: '../DPP',
    },
    {
      id: '5',
      title: 'Device and Network Security',
      subtitle: 'Full introduction to Device and Network Security',
      link: '../DNS',
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to filter courses based on search input
  const filteredCourses = allModulesCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Search Bar */}
        <Text style={styles.learningText}>Learning</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search topic"
            placeholderTextColor="#BBB"
            style={styles.searchInput}
            value={searchQuery} // Bind input value to state
            onChangeText={setSearchQuery} // Update search query on text change
          />
        </View>

        {/* Display only modules if search query is present */}
        {searchQuery ? (
          <>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={filteredCourses} // Use filtered courses based on search input
              renderItem={({ item }) => (
                <View style={styles.moduleCard}>
                  <Text style={styles.moduleTitle}>{item.title}</Text>
                  <Text style={styles.moduleSubtitle}>{item.subtitle}</Text>
                  <Pressable style={styles.startButton}>
                    <Link href={item.link as Href<string>}>
                      <Text style={styles.startButtonText}>Start Learning</Text>
                    </Link>
                  </Pressable>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <>
            {/* Essentials Section (Horizontal Scroll) */}
            <Text style={styles.sectionTitle}>The Essentials</Text>
            <FlatList
              data={essentialsCourses}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.essentialsCard}>
                  <Pressable
                    onPress={() => {router.push(item.link)}}
                    style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]} // Change opacity on press
                  >
                    <Image
                      source={item.image}
                      style={[styles.essentialsImage]}
                    />
                  </Pressable>
                </View>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.essentialsList}
            />

            {/* All Modules Section (Vertical Scroll) */}
            <Text style={styles.sectionTitle}>All Modules</Text>
            <FlatList
              data={allModulesCourses}
              renderItem={({ item }) => (
                <View style={styles.moduleCard}>
                  <Text style={styles.moduleTitle}>{item.title}</Text>
                  <Text style={styles.moduleSubtitle}>{item.subtitle}</Text>
                  <Pressable style={styles.startButton}>
                    <Link href={item.link as Href<string>}>
                      <Text style={styles.startButtonText}>Start Learning</Text>
                    </Link>
                  </Pressable>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  learningText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    color: '#333',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  essentialsList: {
    paddingBottom: 10,
  },
  essentialsCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: Dimensions.get('window').width * 0.75,
  },
  essentialsImage: {
    width: '100%',
    height: '100%', // Increased height for better visibility
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  essentialsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  essentialsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  moduleCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  moduleSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
