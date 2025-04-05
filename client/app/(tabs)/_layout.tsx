import { Link, Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Platform, Pressable, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'

import { useAppSelector } from '@/store'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function TabLayout() {
    const currentUserId = useAppSelector(state => state.currentUserId)

    if (!currentUserId) {
        return <Redirect href="/auth/AuthLayout" />
    }

    return (
        <Tabs
            screenOptions={{
                tabBarInactiveTintColor: 'black',
                tabBarActiveTintColor: Colors.light.concordiaColor,
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
                        <Entypo name="home" size={28} color={color} />
                    ),
                }}
            />

<Tabs.Screen
                name="booking"
                options={{
                    title: 'Booking',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="calendar" size={28} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="qrmodal"
                options={{
                    title: 'Check-in',
                    
                    tabBarButton: ({ accessibilityState }) => (
                        <Link href="/qrmodal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                   <View
                                   style={{
                                       position: 'absolute',
                                       bottom: -40,
                                       left: '50%',
                                       transform: [{ translateX: -30 }, { scale: pressed ? 0.95 : 1 }], // Slight shrink effect on press
                                       backgroundColor: pressed 
                                           ? '#800000'  // Darker color when pressed
                                           : Colors.light.concordiaColor, 
                                       width: 60,
                                       height: 60,
                                       borderRadius: 30,
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       zIndex: 2,
                                       borderWidth: 0,
                                       borderColor: pressed ? '#800020' : 'grey', // Change border color on press
                               
                                       // Shadow (Normal)
                                       shadowColor: '#000',
                                       shadowOffset: { width: 0, height: 4 },
                                       shadowOpacity: pressed ? 0.1 : 0.3, // Reduce shadow intensity on press
                                       shadowRadius: pressed ? 2 : 4, // Smaller blur when pressed
                                       elevation: pressed ? 2 : 6, // Lower elevation when pressed
                                   }}
                               >
                               
                               
                                        <Ionicons
                                            name="qr-code"
                                            size={35}
                                            color={pressed || accessibilityState?.selected ? 'white' : 'white'} // White icon on press, Burgundy otherwise
                                        />
                                        {/* <Text
                style={{
                  fontSize: 10,
                  marginTop: 0, // Adjust position under button
                  color: accessibilityState?.selected ? '#800020' : 'black',
                  fontWeight: '600',
                }}
              >
                Check-in
              </Text> */}
                                    </View>
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />

<Tabs.Screen
                name="membership"
                options={{
                    title: 'Membership',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="v-card" size={28} color={color} />
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
        </Tabs>
    )
}
