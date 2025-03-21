import { Stack } from 'expo-router';
import { DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../store';
import AuthWrapper from '@/app/auth/AuthWrapper';
import { Asset } from 'expo-asset';
import Splash from './splash';


const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Light.ttf'),
  });

  const images = [
    require('../assets/images/jessy.png'),
    require('../assets/images/trainer.png'),
    require('../assets/images/training.jpg'),
  ];

  useEffect(() => {
    async function loadAssets() {
      const imageAssets = images.map((image) =>
        Asset.fromModule(image).downloadAsync()
      );
      await Promise.all(imageAssets);
      await SplashScreen.hideAsync(); // Hide splash screen

      // Show the loading screen for 2 seconds before navigating to the home screen
      setShowLoadingScreen(true);
      setTimeout(() => {
        setShowLoadingScreen(false);
        setAppReady(true);
      }, 2000);
    }

    if (fontsLoaded) {
      loadAssets();
    }
  }, [fontsLoaded]);

  
  if (!fontsLoaded) {
    return null;
  }

  
  if (showLoadingScreen) {
    return <Splash />;
  }

 
  if (!appReady) {
    return null;
  }

  return (
    <Providers>
      <AuthWrapper />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerTitle: () => <></>,
            headerLeft: () => (
              <Image
                source={require('@/assets/images/le_gym.png')}
                style={{ width: 90, height: 40, marginLeft: 15 }}
                resizeMode="contain"
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Notifications Pressed')}>
                <Ionicons
                  name="notifications-outline"
                  size={28}
                  color="#333"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="qrmodal" options={{ presentation: 'transparentModal', animation: 'fade', headerShown: false }} />
        <Stack.Screen name="training" options={{ title: 'Personal Training', headerStyle: { backgroundColor: '#3498db' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }} />
        <Stack.Screen name="auth/AuthLayout" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <ThemeProvider value={LIGHT_THEME}>{children}</ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
