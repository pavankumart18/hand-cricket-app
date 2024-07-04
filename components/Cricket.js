import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

export default function Cricket({ label, onPress, randomNumber, score, result, batting, images }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item.id)}>
      <Image source={item.source} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.CricketImage}>
      <Text style={{ color: "#fff" }}>{label}</Text>
      {randomNumber !== null && (
        <Image source={randomNumber} style={styles.image} resizeMode="contain" />
      )}
      <Text style={{ color: "#fff", fontSize: 20 }}>{batting}</Text>
      <Text style={{ color: "#fff" }}>{score}  {result}</Text>
      {label === "Me" &&
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          style={styles.imageList}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  CricketImage: {
    flex: 1,
    color: "white",
    alignItems: 'center',
  },
  imageList: {
    marginTop: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
