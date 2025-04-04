import { DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import 'react-native-reanimated'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import AuthWrapper from '@/app/auth/AuthWrapper'
import { Asset } from 'expo-asset'
import Splash from './splash'
import { Link, Stack } from 'expo-router'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import { NAV_THEME } from '@/lib/constants'
import { persistor, store } from '../store'

import ToastManager, { Toast } from 'toastify-react-native'
import { PersistGate } from 'redux-persist/integration/react'
import useNotificationStore from '@/store/NotificationStore'

// Prevent the splash screen from auto-hiding before asset loading is complete.

export const unstable_settings = {
    initialRouteName: 'index',
}
export default function RootLayout() {
    SplashScreen.preventAutoHideAsync()

    const [appReady, setAppReady] = useState(false)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)

    const LIGHT_THEME: Theme = {
        ...DefaultTheme,
        colors: NAV_THEME.light,
    }
    const [loaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        Inter: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    })

    const images = [
        require('../assets/images/jessy.png'),
        require('../assets/images/trainer.png'),
        require('../assets/images/training.jpg'),
    ]

    const { unreadNotifications } = useNotificationStore()
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

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
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* QR Code Button
                                <Link href="/qrmodal" asChild>
                                    <TouchableOpacity
                                        onPress={() => console.log('QR Code Pressed')}
                                        style={{ marginRight: 15 }}
                                    >
                                        <Ionicons name="qr-code-outline" size={28} color="#333" />
                                    </TouchableOpacity>
                                </Link> */}
                        
                                {/* Notifications Button */}
                                <Link href="/notifications" asChild>
                                    <TouchableOpacity
                                        onPress={() => console.log('Notifications Pressed')}
                                        style={{ position: 'relative' }}
                                    >
                                        <Ionicons name="notifications-outline" size={28} color="#333" style={{ marginRight: 15 }} />
                                        {unreadNotifications.length > 0 && (
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
                                                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                                                    {unreadNotifications.length}
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        ),
                        
                    }}
                />
                <Stack.Screen name="+not-found" />

                <Stack.Screen
                    name="qrmodal"
                    options={{
                        presentation: 'modal',
                        
                        
                    }}
                />

                <Stack.Screen
                    name="training"
                    options={{
                        title: 'Personal Training', // Set the title for the header
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
                    options={{
                        headerShown: true,
                        headerTitle: 'Terms & Conditions',
                    }}
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
                <Stack.Screen
                    name="notifications"
                    options={{
                        headerShown: true,
                        headerTitle: 'Notifications',
                        
                    }}
                />
                <Stack.Screen
                    name="faq"
                    options={{
                        headerShown: true,
                        headerTitle: 'FAQ',
                    }}
                />
                <Stack.Screen
                    name="InPersonActivity"
                    options={{
                        headerShown: true,
                        headerTitle: 'In Person Activities',
                    }}
                />
                <Stack.Screen
                    name="online"
                    options={{
                        headerShown: true,
                        headerTitle: 'Online Activities',
                        headerBackTitle: 'Go Back',
                    }}
                />
                <Stack.Screen
                    name="nutrition"
                    options={{
                        headerShown: true,
                        headerTitle: 'Nutrition Consultation',
                        headerBackTitle: 'Go Back',
                        
                    }}
                />
                <Stack.Screen
                    name="contact"
                    options={{
                        headerShown: true,
                        headerTitle: 'Contact Us',
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
