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
    const barData = [30, 80, 120, 160, 50, 200, 90]; // Dynamic occupancy data

    return (
        <View className="p-4 bg-white rounded-lg">
            <Text
                className="text-2xl font-bold mb-4 text-center"
                style={{ color: '#98243C' }}
            >
                Gym Occupancy
            </Text>

            <OccupancyTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "realtime" ? (
        <RealTimeGraph />
      ) : (
        <View className="mt-6">
          <HistoricalGraph data={barData}/>
          <OccupancyLegend />
        </View>
      )}
        </View>
    )
}

export default GymOccupancy
