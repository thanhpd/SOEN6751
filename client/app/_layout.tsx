
import { Link, Stack } from 'expo-router'
import { DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'
import { useFonts } from 'expo-font'

import { GestureHandlerRootView } from 'react-native-gesture-handler'


import { useColorScheme } from '@/hooks/useColorScheme'
import { NAV_THEME } from '@/lib/constants'
import { store } from '../store'
import { Provider } from 'react-redux'
import AuthWrapper from '@/app/auth/AuthWrapper'
import SignOutButton from '@/components/ui/SignOutButton'
import ToastManager, { Toast } from 'toastify-react-native'
import Splash from './splash'

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
}


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName: 'index',
};
export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Mirza: require('../assets/fonts/Mirza-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Light.ttf'),
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        Inter: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    })
    
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        async function prepareApp() {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated loading time
            setAppReady(true);
            await SplashScreen.hideAsync(); // Hide splash screen
        }

        prepareApp();
    }, []);

    if (!appReady) {
        return <Splash />; // Show your custom splash screen
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
                                onPress={() => console.log('Notifications  Pressed')}
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
                    name="auth/AuthLayout"
                    options={{ headerShown: false }}
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
}

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GestureHandlerRootView className="flex-1">
            <Provider store={store}>
                <ThemeProvider value={LIGHT_THEME}>{children}</ThemeProvider>
            </Provider>
        </GestureHandlerRootView>
    )
}
