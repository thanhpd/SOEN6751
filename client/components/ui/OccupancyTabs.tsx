import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface OccupancyTabsProps {
    activeTab: 'realtime' | 'historical'
    onTabChange: (tab: 'realtime' | 'historical') => void
}

export const OccupancyTabs: React.FC<OccupancyTabsProps> = ({
    activeTab,
    onTabChange,
}) => {
    const tabs = [
        { value: 'realtime', title: 'Real Time Stats' },
        { value: 'historical', title: 'Historical Stats' },
    ]

    return (
        <View style={styles.tabsList}>
            {tabs.map(tab => (
                <TouchableOpacity
                    key={tab.value}
                    onPress={() =>
                        onTabChange(tab.value as 'realtime' | 'historical')
                    }
                    style={[
                        styles.tabTrigger,
                        activeTab === tab.value && styles.activeTab,
                    ]}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === tab.value
                                ? styles.activeTabText
                                : styles.inactiveTabText,
                        ]}
                    >
                        {tab.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabsList: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 14,
        backgroundColor: '#D9D9D9',
        borderRadius: 28,
        height: 54,
        alignItems: 'center',
        paddingHorizontal: 2, // Add padding to create spacing on the sides
    },
    tabTrigger: {
        flex: 1,
        height: 45,
        backgroundColor: '#D9D9D9',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2, // Add margin to create spacing between tabs
    },
    activeTab: {
        backgroundColor: '#98243C', // Highlight color for the active tab
    },
    tabText: {
        fontSize: 14,
        lineHeight: 18,
    },
    activeTabText: {
        color: '#FFFFFF', // Text color for the active tab
    },
    inactiveTabText: {
        color: '#6E7781', // Text color for inactive tabs
    },
})
