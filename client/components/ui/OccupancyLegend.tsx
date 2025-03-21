import React from 'react'
import { View, Text } from 'react-native'

interface LegendItemProps {
    color: string
    label: string
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
    <View className="flex-row items-center mb-2">
        <View className={`w-3 h-3 rounded-full ${color} mr-2`} />
        <Text className="text-black-600 text-xs">{label}</Text>
    </View>
)

export const OccupancyLegend: React.FC = () => {
    return (
        <View className="mt-8 flex-row justify-between">
            <LegendItem color="bg-[#34C759]" label="Normal (0 - 50)" />
            <LegendItem color="bg-[#FF6600]" label="Moderate (50 - 150)" />
            <LegendItem color="bg-[#D32C2F]" label="Crowded (150+)" />
        </View>
    )
}
