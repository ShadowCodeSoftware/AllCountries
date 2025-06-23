import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export type TypeCountry = {
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
  flags: { png: string };
  cca2: string;
};

export default function ContryCard({ item, onPress }: { item: TypeCountry; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable} activeOpacity={0.85}>
      <View style={styles.card}>
        <Image source={{ uri: item.flags.png }} style={styles.flag} />
        <Text style={styles.title} numberOfLines={1}>{item.name.common}</Text>
        <Text style={styles.info} numberOfLines={1}>Capitale: {item.capital ? item.capital[0] : 'N/A'}</Text>
        <Text style={styles.info} numberOfLines={1}>Région: {item.region}</Text>
        <Text style={styles.info} numberOfLines={1}>Population: {item.population.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  flag: {
    width: 60,
    height: 38,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
    textAlign: 'center',
    color: '#222',
  },
  info: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 1,
    color: '#444',
  },
});