import { StyleSheet, Image, Text, Platform } from 'react-native'
import React from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'
import HeroBanner from '../../components/HeroBanner'
import { ActivityList } from '@/components/ui/ActivityList'
import { CategoryList } from '@/components/CategoryList'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function ActivitiesScreen() {
    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
                <HeroBanner />
                <CategoryList />
                <ActivityList />
        </SafeAreaView>
      </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
  });