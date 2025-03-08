import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Category } from '../constants/types'

const categories: Category[] = [
    { name: 'All Activities' },
    { name: 'Aerobics', isActive: true },
    { name: 'Dance' },
    { name: 'Spinning' },
    { name: 'Martial Arts' },
    { name: 'Fitness & Relaxation' },
    { name: 'Drop-In Recreation' },
    { name: 'Instructional Activities' },
]

const CategoryItem: React.FC<Category> = ({ name, isActive }) => (
    <TouchableOpacity
        className={`px-4 py-2 rounded-full mr-2 ${
            isActive ? 'bg-purple-600' : 'bg-gray-100'
        }`}
    >
        <Text
            className={`${isActive ? 'text-white' : 'text-gray-700'} font-medium`}
        >
            {name}
        </Text>
    </TouchableOpacity>
)

export const CategoryList: React.FC = () => {
    return (
        <View className="mb-6">
            <Text className="text-xl font-bold mb-4 px-4">Categories</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-4"
            >
                <View className="flex-row flex-wrap">
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            name={category.name}
                            isActive={category.isActive}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
