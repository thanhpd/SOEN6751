import { StyleSheet, Image, Text, Platform } from 'react-native'

import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import React from 'react'
import { View, FlatList, SafeAreaView, StatusBar } from 'react-native'
import HeroBanner from '../../components/HeroBanner'
import { ActivityList } from '@/components/ui/ActivityList'

export default function Activities() {
    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <HeroBanner />
                <ActivityList/>
            </View>
        </SafeAreaView>
    )
};
