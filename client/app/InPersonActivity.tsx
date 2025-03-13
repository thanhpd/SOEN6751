import { StyleSheet, Image, Text, Platform } from 'react-native'
import React from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'
import HeroBanner from '../components/HeroBanner'
import { InPersonActivityList } from '@/components/ui/InPersonActivityList'
import { CategoryList } from '@/components/CategoryList'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function InPersonActivity() {
    return (

            <View style={{ flex: 1 }}>
                <HeroBanner />
                <CategoryList />
                <InPersonActivityList />
            </View>

    )
}


