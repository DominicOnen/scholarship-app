import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function PendingScreen({ route, navigation }) {
  const { scholarship } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>⏳ Application Pending</Text>
      </View>

      <Text style={styles.title}>Under Review</Text>
      
      <Text style={styles.description}>
        Your application for <Text style={styles.bold}>{scholarship?.name || 'the scholarship'}</Text> has been received and is currently being evaluated by the board.
      </Text>

      {/* Button to simulate acceptance for testing */}
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('Acceptance', { scholarship })}
      >
        <Text style={styles.buttonText}>Check Status Update</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#856404',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
    marginBottom: 30,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
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