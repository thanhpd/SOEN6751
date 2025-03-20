import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

interface HistoricalGraphProps {
    data: number[] // Array of occupancy values
}

export const HistoricalGraph: React.FC<HistoricalGraphProps> = ({ data }) => {
    const screenWidth = Dimensions.get('window').width

    // Define thresholds and colors based on the legend
    const getBarColor = (value: number): string => {
        if (value <= 50) return '#34C759' // Normal
        if (value <= 150) return '#FF6600' // Moderate
        return '#D32C2F' // Crowded
    }

    // Generate colors for the bars dynamically
    const barColors = data.map(value => getBarColor(value))

    return (
        <View className="mt-6">
            <Text className="text-center text-lg font-bold mb-4">
                Historical Gym Occupancy
            </Text>
            <BarChart
                data={{
                    labels: [
                        '7 am',
                        '9 am',
                        '11 am',
                        '1 pm',
                        '3 pm',
                        '5 pm',
                        '7 pm',
                    ], // X-axis labels
                    datasets: [
                        {
                            data: data, // Heights of the bars
                        },
                    ],
                }}
                width={screenWidth - 32} // Adjust width dynamically
                height={220} // Set a fixed height
                yAxisLabel="" // Optional: Add a prefix to Y-axis values
                yAxisSuffix="%" // Optional: Add a suffix to Y-axis values
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0, // No decimal places
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    barPercentage: 0.5,
                    propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: '#e3e3e3',
                        strokeDasharray: '0',
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                fromZero // Start Y-axis from zero
                showBarTops={false}
                withInnerLines={true}
            />
        </View>
    )
}
