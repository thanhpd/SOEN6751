import { DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
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
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="auth/AuthLayout"
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />
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
