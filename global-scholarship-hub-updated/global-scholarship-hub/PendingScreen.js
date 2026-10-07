import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { getApplicationStatus } from './api';

export default function PendingScreen({ route, navigation }) {
  const { scholarship, applicationId, submittedAt } = route.params || {};
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');

  const checkStatus = async () => {
    setChecking(true);
    const { status } = await getApplicationStatus(applicationId, submittedAt);
    setChecking(false);
    if (status === 'accepted') navigation.navigate('Acceptance', { scholarship });
    else if (status === 'rejected') setMessage('Unfortunately your application was not successful.');
    else setMessage('Still under review. Please check again in a moment.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>⏳ Application Pending</Text>
      </View>

      <Text style={styles.title}>Under Review</Text>
      
      <Text style={styles.description}>
        Your application for <Text style={styles.bold}>{scholarship?.name || 'the scholarship'}</Text> has been received and is currently being evaluated by the board.
      </Text>

      {!!message && <Text style={styles.message}>{message}</Text>}

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={checkStatus}
        disabled={checking}
      >
        {checking ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Check Status Update</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  message: { color: '#856404', textAlign: 'center', marginBottom: 16 },
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