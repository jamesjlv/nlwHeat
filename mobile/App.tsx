import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { Home } from './src/screens/Home';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, Platform, StyleSheet } from 'react-native';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121214' }}>
        <AuthProvider>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <Home />
        </AuthProvider>
      </SafeAreaView>
    );
  }
}
