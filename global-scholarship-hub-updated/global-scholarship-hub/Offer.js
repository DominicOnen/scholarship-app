import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { getScholarships } from './api';

export default function Offer({ navigation }) {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    getScholarships().then(({ items, online }) => {
      setScholarships(items);
      setOnline(online);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.hint}>Loading offers…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Browse Scholarship Offers</Text>
        {!online && <Text style={styles.offline}>Offline mode: showing saved offers</Text>}

        {scholarships.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => navigation.navigate('Details', { scholarship: item })}
          >
            <Text style={styles.institution}>{item.name}</Text>
            <Text style={styles.field}>Field: {item.field}</Text>
          </Pressable>
        ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  hint: { marginTop: 10, color: '#555' },
  offline: { textAlign: 'center', color: '#856404', backgroundColor: '#FFF3CD', padding: 8, borderRadius: 8, marginBottom: 12 },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  cardPressed: {
    backgroundColor: '#e6f0ff',
    opacity: 0.9,
  },
  institution: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  field: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
});