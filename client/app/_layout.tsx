import { Link, Stack } from 'expo-router'
import { DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NAV_THEME } from '@/lib/constants'
import { persistor, store } from '../store'
import { Provider } from 'react-redux'
import AuthWrapper from '@/app/auth/AuthWrapper'
import ToastManager, { Toast } from 'toastify-react-native'
import { PersistGate } from 'redux-persist/integration/react'
import useNotificationStore from '@/store/NotificationStore'

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
    initialRouteName: 'index',
}
export default function RootLayout() {
    const [loaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        Inter: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    const { unreadNotifications: notifications } = useNotificationStore();

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
                                        console.log('Notifications Pressed')
                                    }
                                    style={{ position: 'relative' }}
                                >
                                    <Ionicons
                                        name="notifications-outline"
                                        size={28}
                                        color="#333"
                                        style={{ marginRight: 15 }}
                                    />
                                    {notifications.length > 0 && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: -5,
                                                right: 10,
                                                backgroundColor: 'red',
                                                borderRadius: 10,
                                                width: 20,
                                                height: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {notifications.length}
                                            </Text>
                                        </View>
                                    )}
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
}

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
