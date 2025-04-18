import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { OccupancyTabs } from '@/components/ui/OccupancyTabs'
import { HistoricalGraph } from '@/components/ui/HistoricalGraph'
import { RealTimeGraph } from '@/components/ui/RealTimeGraph'
import { OccupancyLegend } from '@/components/ui/OccupancyLegend'

export const GymOccupancy: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'realtime' | 'historical'>(
        'realtime'
    )
    const barData = [40, 45, 75, 220, 151, 120, 110, 80, 40, 15] // Dynamic occupancy data

    return (
        <View className="p-4 bg-white rounded-lg">
            <Text
                className="text-2xl font-bold mb-1 text-center"
                style={{ color: '#98243C' }}
            >
                Gym Occupancy
            </Text>

            <OccupancyTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'realtime' ? (
                <View className="mt-6">
                    <RealTimeGraph data={barData} />
                    <OccupancyLegend />
                </View>
            ) : (
                <View className="mt-6">
                    <HistoricalGraph data={barData} />
                    <OccupancyLegend />
                </View>
            )}
        </View>
    )
}

export default GymOccupancy
