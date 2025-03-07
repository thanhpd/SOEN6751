import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Mirza: require('../assets/fonts/Mirza-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Light.ttf'),
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
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
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
                    name="qr-code-outline"
                    size={28}
                    color="#333"
                    style={{ marginRight: 15 }}
                />
            </TouchableOpacity>
        ),
    }}  />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    )
}
