import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

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
                name="explore"
                options={{
                    title: 'Explore',

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
