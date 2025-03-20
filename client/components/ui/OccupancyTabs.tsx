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
    },
    tabTrigger: {
        flex: 1,
        height: 48,
        backgroundColor: '#D9D9D9',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: 'red', // Highlight color for the active tab
    },
    tabText: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    activeTabText: {
        color: '#D9D9D9', // Text color for the active tab
    },
    inactiveTabText: {
        color: '#6E7781', // Text color for inactive tabs
    },
})
