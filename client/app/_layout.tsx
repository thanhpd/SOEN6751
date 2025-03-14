import { DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'
import { useFonts } from 'expo-font'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { hydrateAuth } from '@/lib'

import { NAV_THEME } from '@/lib/constants'

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
}

hydrateAuth()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Mirza: require('../assets/fonts/Mirza-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Light.ttf'),
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        Inter: require('../assets/fonts/Inter_18pt-Regular.ttf')
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <Providers>
            <Stack>
                <Stack.Screen name="(tabs)" options={{
        headerShown: true,
        headerTitle: () => <></>,
        headerStyle: { backgroundColor: '#f8f9fa' },
        headerTintColor: '#333',
        headerLeft: () => (
            <Image
                source={require('@/assets/images/le_gym.png')} // Change to your logo path
                style={{ width: 90, height: 40, marginLeft: 15 }}
                resizeMode="contain"
            />
        ),
        headerRight: () => (
            <TouchableOpacity onPress={() => console.log('QR Code Pressed')}>
                <Ionicons
                    name="notifications"
                    size={28}
                    color="#333"
                    style={{ marginRight: 15 }}
                />
            </TouchableOpacity>
        ),
    }}  />
                <Stack.Screen name="+not-found" 
                />
                <Stack.Screen
                    name="auth/AuthLayout"
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />

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
            </Stack>
            <StatusBar style="auto" />
        </Providers>
    )
}

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GestureHandlerRootView className="flex-1">
            <ThemeProvider value={LIGHT_THEME}>{children}</ThemeProvider>
        </GestureHandlerRootView>
    )
}
