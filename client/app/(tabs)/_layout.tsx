import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'



import { useAppSelector } from '@/store'
import { IconSymbol } from '@/components/ui/IconSymbol'


export default function TabLayout() {
    const colorScheme = useColorScheme()
    const userToken = useAppSelector(state => state.auth.userToken)

    if (!userToken) {
        return <Redirect href="/auth/AuthLayout" />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={28} color="black" />
                    ),
                    
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="person.fill"
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="membership"
                options={{
                    title: 'Membership',

                    tabBarIcon: ({ color }) => (
                        <Entypo name="v-card" size={28} color="black" />
                    ),
                }}
            />

            <Tabs.Screen
                name="booking"
                
                options={{
                    title: 'booking',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="calendar-clear"
                            size={28}
                            color="black"
                        />
                    ),
                }}
            />




        </Tabs>
    )
}
