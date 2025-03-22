import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';

const initialCategories = [
    { name: 'All Activities' },
    { name: 'Aerobics' },
    { name: 'Dance' },
    { name: 'Spinning' },
    { name: 'Martial Arts' },
    { name: 'Fitness & Relaxation' },
    { name: 'Drop-In Recreation' },
    { name: 'Instructional Activities' },
];

export const CategoryList: React.FC<{ onCategorySelect: (category: string) => void }> = ({ onCategorySelect }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default selected index (All Activities)

    const toggleCategory = (index: number, category: string) => {
        setActiveIndex(index);
        onCategorySelect(category);
    };

    return (
        <View className="mb-1" style={{ marginBottom: 15 }}>
            <Text className="text-black text-2xl font-bold text" style={{ marginLeft: 25 }}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                {initialCategories.map((category, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleCategory(index, category.name)}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                marginHorizontal: 6,
                                borderRadius: 20,
                                backgroundColor: isActive ? Colors.light.concordiaColor : Colors.light.fadedconcordiaColor,
                                marginLeft: index === 0 ? 23 : 6,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: '600',
                                    color: isActive ? 'white' : 'black',
                                }}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
