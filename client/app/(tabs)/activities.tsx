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
import { CategoryList } from '../../components/CategoryList'
import { Activity } from '../../constants/types'
import { ActivityList } from '@/components/ui/ActivityList'
import { ActivityItem } from '@/components/ui/ActivityItem'

export default function ActivityListRender() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <View>
                <HeroBanner />
                <FlatList
                    data={activityItems}
                    renderItem={({ item }) => <ActivityItem activity={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const activityItems: Activity[] = [
    {
        title: 'Cardio Dance',
        instructor: 'Danielle Hubbard',
        location: 'SGW – Le Gym – Studio C',
        price: '$100',
        description:
            'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Monday, Wednesday, Friday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Zumba Fitness',
        instructor: 'Veronica Aguirre',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$55',
        description:
            'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Tuesday, Thursday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Total Body Fitness',
        instructor: 'Daphne Cunliffe',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
        days: 'Monday, Wednesday, Friday',
        time: '12:00 PM – 1:00 PM',
    },
    {
        title: 'Hard Core',
        instructor: 'Vila Woo',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
        days: 'Tuesday, Thursday',
        time: '12:00 PM – 1:00 PM',
    },

    {
        title: 'Cardio Dance',
        instructor: 'Danielle Hubbard',
        location: 'SGW – Le Gym – Studio C',
        price: '$100',
        description:
            'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Monday, Wednesday, Friday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Zumba Fitness',
        instructor: 'Veronica Aguirre',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$55',
        description:
            'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Tuesday, Thursday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Total Body Fitness',
        instructor: 'Daphne Cunliffe',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
        days: 'Monday, Wednesday, Friday',
        time: '12:00 PM – 1:00 PM',
    },
    {
        title: 'Hard Core',
        instructor: 'Vila Woo',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
        days: 'Tuesday, Thursday',
        time: '12:00 PM – 1:00 PM',
    },
]

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
})
