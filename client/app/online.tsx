import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import HeroBanner from '@/components/HeroBanner'
import SearchBar from '@/components/SearchBar'
import { ActivityList } from '@/components/ui/ActivityList'
import useActivityStore from '@/store/ActivityStore'
import { Activity } from '@/constants/types'
import { CategoryList } from '@/components/CategoryList'

const { width } = Dimensions.get('window')

export default function OnlinePage() {
    const { activities } = useActivityStore()

    var online = activities.filter(item => item.type === 'Online')
        const [filteredActivities, setFilteredActivities] =
            useState<Activity[]>(online)


    return (
        <View style={styles.container}>
            <HeroBanner
                title="Online Workouts Spring 2025"
                description="Stay fit and healthy from home."
                date="From Feb 10 to June 30"
                image={require('../assets/images/online.png')}
            />

            <CategoryList
                            onCategorySelect={(category: string) => {
                                if (category === 'All Activities') {
                                    setFilteredActivities(online)
                                    return
                                }
            
                                const filtered = online.filter(
                                    online => online.category === category
                                )
                                setFilteredActivities(filtered)
                            }}
                        />
             {filteredActivities.length > 0 ? (
                            <ActivityList activities={filteredActivities} />
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>
                                No activities have been scheduled yet.
                            </Text>
                        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
    },
    cardText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
    },
})
