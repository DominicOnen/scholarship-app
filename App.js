import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Offer from './Offer';
import DetailsScreen from './Details';
import PendingScreen from './PendingScreen';
import AcceptanceScreen from './AcceptanceScreen';
import Registration from './Registration';

const Stack = createNativeStackNavigator();

// 1. Landing Screen Component (Pass navigation as a prop)
function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Scholarship Hub</Text>
      <Text style={styles.paragraph}>
        Explore active institutional offers and submit your profile
      </Text>

      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={() => navigation.navigate('Offers')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

// 2. Main App Component (Must be default exported for Expo)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Offers" component={Offer} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Pending" component={PendingScreen} />
        <Stack.Screen name="Acceptance" component={AcceptanceScreen} />
        <Stack.Screen name="Registration" component={Registration}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});