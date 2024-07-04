import React, { useState } from 'react';
import { StyleSheet, View, Image, FlatList, Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Cricket from './components/Cricket';
import zero from './assets/zero.png';
import one from './assets/one.png';
import two from './assets/two.png';
import three from './assets/three.png';
import four from './assets/four.png';
import five from './assets/five.png';
import six from './assets/six.png';
import splash from './assets/splash.png';

const images = [
  { id: '0', source: zero },
  { id: '1', source: one },
  { id: '2', source: two },
  { id: '3', source: three },
  { id: '4', source: four },
  { id: '5', source: five },
  { id: '6', source: six },
];

export default function App() {
  const [randomNumberA, setRandomNumberA] = useState(splash);
  const [randomNumberB, setRandomNumberB] = useState(splash);
  const [result, setResult] = useState(null);
  const [scoreA, setScoreA] = useState(0);
  const [batting, setBatting] = useState(true);
  const [scoreB, setScoreB] = useState(0);
  const [count, setCount] = useState(1);
  const [currentA, setCurrentA] = useState("Bowling");
  const [currentB, setCurrentB] = useState("Batting");

  const generateRandomNumberA = () => {
    const numberA = Math.floor(Math.random() * 7);
    setRandomNumberA(images[numberA].source);
    return numberA;
  };

  const selectImageB = (numberB) => {
    const numberA = generateRandomNumberA();
    setRandomNumberB(images[numberB].source);
    ResultDeclaration(numberA, parseInt(numberB));
  };

  const ResultDeclaration = (numberA, numberB) => {
    if (numberA === numberB) {
      if (count % 2 === 0) {
        if (scoreB > scoreA) {
          setResult("Hooray");
          alert("You won the match");
          setScoreA(0);
          setScoreB(0);
        } else {
          setResult("You Lost");
          alert("Sorry, you lost the match");
          setScoreA(0);
          setScoreB(0);
        }
        setBatting(true);
        setCurrentB("Batting");
        setCurrentA("Bowling");
      } else {
        setBatting(false);
        setCurrentA("Batting");
        setCurrentB("Bowling");
      }
      setCount(count + 1);
    } else {
      setResult(null);
      if (batting === true) {
        setScoreB(scoreB + numberB);
      } else {
        setScoreA(scoreA + numberA);
      }
    }
  };

  const Reset = () => {
    setScoreA(0);
    setScoreB(0);
    setBatting(true);
    setCount(1);
    setResult(null);
    setCurrentA("Bowling");
    setCurrentB("Batting");
  };

  return (
    <View style={styles.container}>
      <Cricket label="Computer" randomNumber={randomNumberA} score={scoreA} batting={currentA} />
      <Cricket label="Me" randomNumber={randomNumberB} onPress={selectImageB} score={scoreB} result={result} batting={currentB} images={images} />
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={Reset}>
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>Reset</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    width: 100,
    height: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});
