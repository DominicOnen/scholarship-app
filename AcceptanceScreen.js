import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function AcceptanceScreen({ route, navigation }) {
  const { scholarship } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎉</Text>
      
      <Text style={styles.title}>Congratulations!</Text>

      <Text style={styles.subtitle}>
        You have been accepted into <Text style={styles.bold}>{scholarship?.name || 'the program'}</Text>!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Offer Summary</Text>
        <Text style={styles.cardText}>Field: {scholarship?.field || 'N/A'}</Text>
        <Text style={styles.cardText}>Status: Officially Admitted</Text>
      </View>

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('Offers')}
      >
        <Text style={styles.buttonText}>Back to Offers</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F4FBF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 30,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});