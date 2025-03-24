import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

interface RealTimeGraphProps {
    data: number[] // Array of occupancy values
}

export const RealTimeGraph: React.FC<RealTimeGraphProps> = ({ data }) => {
    const screenWidth = Dimensions.get('window').width

    // Define thresholds and colors based on the legend
    const getBarColor = (value: number): ((opacity?: number) => string) => {
        if (value <= 50) return (opacity = 1) => `rgba(52, 199, 89, ${opacity})` // Normal
        if (value <= 150)
            return (opacity = 1) => `rgba(255, 102, 0, ${opacity})` // Moderate
        return (opacity = 1) => `rgba(211, 44, 47, ${opacity})` // Crowded
    }

    // Define the labels for the X-axis
    const labels = ['10 am', '', '', '1 pm', '', '', '4 pm', '', '', '7 pm']

    // Get the current hour to determine the current time bar
    const currentHour = new Date().getHours()
    // const currentHour = 14 // For TESTING ONLY

    // Determine the starting hour from the first non-empty label
    const startingHour = 10 // '10 am' corresponds to 10 in 24-hour format

    // Calculate the index of the current time bar
    const currentTimeIndex =
        currentHour >= startingHour &&
        currentHour < startingHour + labels.length
            ? currentHour - startingHour // Calculate the relative index
            : -1 // If the current hour is outside the range, no bar is highlighted

    // Generate colors for the bars dynamically
    const barColors = data.map(
        (value, index) =>
            index === currentTimeIndex
                ? getBarColor(value) // Use the threshold-based color for the current time bar
                : (opacity = 1) => `rgba(233, 236, 241, ${opacity})` // Default bar color for other bars
    )

    // Normalize data to fit within the fixed Y-axis range
    const normalizedData = data.map(value => (value > 200 ? 200 : value))

    return (
        <View className="items-center">
            <BarChart
                data={{
                    labels, // X-axis labels
                    datasets: [
                        {
                            data: normalizedData, // Heights of the bars
                            colors: barColors, // Colors of the bars
                        },
                    ],
                }}
                width={screenWidth - 32} // Adjust width dynamically
                height={220} // Set a fixed height
                yAxisLabel="" // Optional: Add a prefix to Y-axis values
                yAxisSuffix="" // Optional: Add a suffix to Y-axis values
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0, // No decimal places
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: () => '#767676', // Set X-axis label color
                    propsForLabels: {
                        fontWeight: 'bold',
                    },
                    barPercentage: 0.5,
                    propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: '#e3e3e3',
                        strokeDasharray: '0',
                    },
                    barRadius: 2.76,
                    horizontalOffset: 10,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    paddingRight: 35,
                    paddingLeft: 60,
                }}
                fromZero // Start Y-axis from zero
                yAxisInterval={50} // Set Y-axis intervals to 50
                showBarTops={false}
                withInnerLines={true}
                withHorizontalLabels={false}
                withVerticalLabels={true}
                withCustomBarColorFromData={true}
                flatColor={true}
            />
            {/* Custom Y-axis labels */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 220,
                    justifyContent: 'space-around', // Adjust spacing between labels
                }}
            >
                {['200+', '150', '100', '50', '0'].map((label, index) => (
                    <Text
                        key={index}
                        style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#767676',
                            textAlign: 'right',
                            marginLeft: -10,
                        }}
                    >
                        {label}
                    </Text>
                ))}
            </View>
        </View>
    )
}
