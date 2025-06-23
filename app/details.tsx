import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Country = {
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
  flags: { png: string };
  cca2: string;
  subregion?: string;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
};

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const country: Country = params.country ? JSON.parse(params.country as string) : null;

  if (!country) return <Text>Pas de données</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: country.flags.png }} style={styles.flag} />
      <Text style={styles.title}>{country.name.common}</Text>
      <Text style={styles.info}>Capitale: {country.capital ? country.capital[0] : 'N/A'}</Text>
      <Text style={styles.info}>Région: {country.region}</Text>
      <Text style={styles.info}>Sous-région: {country.subregion || 'N/A'}</Text>
      <Text style={styles.info}>Population: {country.population.toLocaleString()}</Text>
      <Text style={styles.info}>Superficie: {country.area ? country.area.toLocaleString() + ' km²' : 'N/A'}</Text>
      <Text style={styles.info}>Langues: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Text>
      <Text style={styles.info}>Monnaies: {country.currencies ? Object.values(country.currencies).map(c => c.name + (c.symbol ? ` (${c.symbol})` : '')).join(', ') : 'N/A'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f8f8',
  },
  flag: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
});
