import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper'; 
import { firebaseApp } from '../../Firebaseconfig';
import { getFirestore, doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const screenWidth = Dimensions.get('window').width;

const RankingPage = () => {
  const [userScore, setUserScore] = useState(7000); // Default score
  const [totalXP, setTotalXP] = useState(150); // Maximum XP
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(1);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  // Fetch leaderboard data and user score from Firestore
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      
      if (user) {
        const userRef = doc(db, 'userInfo', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setUserScore(userDoc.data().totalScore || 0);
        }
      }

      const leaderboardQuery = query(
        collection(db, 'userInfo'),
        orderBy('totalScore', 'desc'),
        limit(3) // Limit to top 3 for leaderboard
      );

      const leaderboardSnapshot = await getDocs(leaderboardQuery);
      const leaderboard = leaderboardSnapshot.docs.map((doc) => ({
        name: doc.data().username,
        score: doc.data().totalScore
      }));

      setLeaderboardData(leaderboard);

      // Determine the user's rank in the leaderboard
      const userPosition = leaderboard.findIndex(item => item.name === user?.displayName) + 1;
      setUserRank(userPosition > 0 ? userPosition : leaderboard.length + 1);
    };

    fetchLeaderboard();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>

        {/* Display the leaderboard */}
        <View>
          <BarChart
            style={styles.chart}
            data={{
              labels: leaderboardData.map((item, index) => `${index + 1} (${item.name})`),
              datasets: [{ data: leaderboardData.map(item => item.score) }]
            }}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.subtitle}>Your Summary</Text>

          {/* Progress Bar showing score in XP */}
          <View style={styles.progressBarContainer}>
            <Text style={styles.levelText}>Your Level</Text>
            <ProgressBar progress={userScore / totalXP} color={'#4caf50'} style={styles.progressBar} />
            <Text style={styles.xpText}>{`${userScore} XP out of ${totalXP} XP`}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  progressBar: {
    width: '80%',
    height: 10,
    borderRadius: 5,
  },
  xpText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
});

export default RankingPage;
