import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { submitApplication } from './api';

export default function Registration({ route, navigation }) {
  const { scholarship } = route.params || {};
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (fullName.trim().length < 2) return setError('Please enter your full name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError('Please enter a valid email.');
    setError('');
    setBusy(true);
    try {
      const result = await submitApplication(scholarship, fullName.trim(), email.trim());
      navigation.navigate('Pending', {
        scholarship,
        applicant: { fullName, email },
        applicationId: result.id,
        submittedAt: result.submittedAt || Date.now(),
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scholarship Application</Text>
      <Text style={styles.subtitle}>
        Applying for: <Text style={styles.bold}>{scholarship?.name || 'Selected Program'}</Text>
      </Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleSubmit}
        disabled={busy}
      >
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Application</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  error: { color: '#B00020', marginBottom: 8 },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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