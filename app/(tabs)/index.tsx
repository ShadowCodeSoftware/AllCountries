import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ContryCard, { TypeCountry } from '@/components/contryCard';

type Country = TypeCountry;

export default function HomeScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/independent?status=true')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text style={{margin: 20}}>Chargement...</Text>;

  return (
    <View style={{ flex: 1, paddingHorizontal: 8, paddingTop: 8, backgroundColor: '#f8f8f8' }}>
      <FlatList
        data={countries}
        keyExtractor={item => item.cca2}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
        renderItem={({ item }) => (
          <ContryCard
            item={item as TypeCountry}
            onPress={() => router.push(`/details?country=${encodeURIComponent(JSON.stringify(item))}`)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}


