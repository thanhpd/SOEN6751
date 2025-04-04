import React, { useState } from 'react'
import { View, Text } from 'react-native'
import HeroBanner from '../components/HeroBanner'
import { ActivityList } from '@/components/ui/ActivityList'
import { CategoryList } from '@/components/CategoryList'
import useActivityStore from '@/store/ActivityStore'
import { Activity } from '@/constants/types'

export default function InPersonActivities() {
    const { activities } = useActivityStore()
    var inPersons = activities.filter(item => item.type === 'InPerson')
    const [filteredActivities, setFilteredActivities] =
        useState<Activity[]>(inPersons)

    return (
        <View style={{ flex: 1 }}>
            <HeroBanner
                title="In-Person Activities Winter 2025"
                description="Get inspired and moving at the same time."
                date="From Feb 10 to June 30"
                image={require('../assets/images/hero.png')}
            />

<CategoryList
            onCategorySelect={(category: string) => {
                if (category === 'All Activities') {
                    setFilteredActivities(inPersons)
                    return
                }

                const filtered = inPersons.filter(
                    activity => activity.category === category
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
