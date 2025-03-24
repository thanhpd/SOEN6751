
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
import AuthWrapper from '@/app/auth/AuthWrapper';
import { Asset } from 'expo-asset';
import Splash from './splash';
import { Link, Stack } from 'expo-router'

import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import { NAV_THEME } from '@/lib/constants'
import { persistor, store } from '../store'

import ToastManager, { Toast } from 'toastify-react-native'
import { PersistGate } from 'redux-persist/integration/react'








    

// Prevent the splash screen from auto-hiding before asset loading is complete.




export const unstable_settings = {
    initialRouteName: 'index',
}
export default function RootLayout() {


    SplashScreen.preventAutoHideAsync()

    const [appReady, setAppReady] = useState(false);
const [showLoadingScreen, setShowLoadingScreen] = useState(false);

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
}
    const [loaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        Inter: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    })

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
                        headerStyle: { backgroundColor: '#f8f9fa' },
                        headerTintColor: '#333',
                        headerLeft: () => (
                            <Image
                                source={require('@/assets/images/le_gym.png')} // Change to your logo path
                                style={{
                                    width: 90,
                                    height: 40,
                                    marginLeft: 15,
                                }}
                                resizeMode="contain"
                            />
                        ),
                        headerRight: () => (
                            <Link href="/notifications" asChild>
                                <TouchableOpacity
                                    onPress={() =>
                                        console.log('Notifications  Pressed')
                                    }
                                >
                                    <Ionicons
                                        name="notifications-outline"
                                        size={28}
                                        color="#333"
                                        style={{ marginRight: 15 }}
                                    />
                                </TouchableOpacity>
                               
                            </Link>
                        ),
                    }}
                />
                <Stack.Screen name="+not-found" />


                <Stack.Screen
                    name="qrmodal"
                    options={{
                        presentation: 'transparentModal',
                        animation: 'fade',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="training"
                    options={{
                        title: 'Personal Training', // Set the title for the header
                        headerStyle: {
                            backgroundColor: '#3498db', // Set the background color of the header
                        },
                        headerTintColor: '#fff', // Set the color of the header text
                        headerTitleStyle: {
                            fontWeight: 'bold', // Make the title bold
                        },
                        headerBackTitle: 'Go Back',
                    }}
                />

                <Stack.Screen
                    name="order-review"
                    options={{
                        title: 'My Order',
                    }}
                />

                <Stack.Screen
                    name="order-payment"
                    options={{
                        title: 'Payment Details',
                    }}
                />

                <Stack.Screen
                    name="payment-manager"
                    options={{
                        title: 'Payment Details',
                    }}
                />
                <Stack.Screen
                    name="order-completed"
                    options={{
                        headerTitle: '',
                    }}
                />
                <Stack.Screen
                    name="terms"
                    options={{ title: 'Terms and Conditions' }}
                />

            
                <Stack.Screen
                    name="auth/AuthLayout"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileDetails"
                    options={{
                        headerShown: true,
                        headerTitle: 'Edit Profile',
                    }}
                />
                
            </Stack>
            <StatusBar style="auto" />
            <ToastManager
                showCloseIcon={false}
                showProgressBar={false}
                animationStyle="upInUpOut"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.9) !important',
                    padding: 0,
                    borderRadius: 24,
                }}
                textStyle={{
                    color: '#fff',
                    fontSize: 16,
                    padding: 0,
                }}
            />
        </Providers>
    )

    function Providers({ children }: { children: React.ReactNode }) {
      return (
          <GestureHandlerRootView className="flex-1">
              <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                      <ThemeProvider value={LIGHT_THEME}>
                          {children}
                      </ThemeProvider>
                  </PersistGate>
              </Provider>
          </GestureHandlerRootView>
      )
  }
}

