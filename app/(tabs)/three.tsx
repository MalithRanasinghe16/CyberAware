import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Assuming you've added this library for progress bar

const screenWidth = Dimensions.get('window').width;

const RankingPage = () => {
  const data = {
    labels: ['1st', '2nd', '3rd'],
    datasets: [
      {
        data: [100, 80, 60],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard September</Text>
        <View>
          <BarChart
            style={styles.chart}
            data={data}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.subtitle}>Your Summary</Text>
          <View style={styles.progressBarContainer}>
            <Text style={styles.levelText}>Your Level</Text>
            <ProgressBar progress={0.7} color={'#4caf50'} style={styles.progressBar} />
            <Text style={styles.xpText}>7000 XP</Text>
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
    marginTop:60
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
});

export default RankingPage;
