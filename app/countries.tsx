import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Country = {
  name: { common: string };
  capital?: string[];
  region: string;
  flags: { png: string };
};

export default function CountriesScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Chargement...</Text>;

  return (
    <FlatList
      data={countries}
      keyExtractor={item => item.name.common}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.name.common}</Text>
          <Text>Capitale: {item.capital ? item.capital[0] : 'N/A'}</Text>
          <Text>Région: {item.region}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});