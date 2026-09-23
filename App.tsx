import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InstagramProvider } from './src/context/InstagramContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <InstagramProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </InstagramProvider>
    </SafeAreaProvider>
  );
}
