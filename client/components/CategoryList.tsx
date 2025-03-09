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
];
    

const CategoryItem: React.FC<Category> = ({ name, isActive }) => (
    // <TouchableOpacity
    //     className={`px-4 py-2 rounded-full mr-2 ${
    //         isActive ? 'bg-purple-600' : 'bg-gray-100'
    //     }`}
    // >
    //     <Text
    //         className={`${isActive ? 'text-white' : 'text-gray-700'} font-medium`}
    //     >
    //         {name}
    //     </Text>
    // </TouchableOpacity>
    <Text>{name}</Text>
)

export const CategoryList: React.FC = () => {
    return (
        <View className="mb-6">
            <View className="items-center">
                <Text>Categories</Text>
            </View>
            <View className="flex-row flex-wrap justify-center">
                {categories.map((category, index) => (
                    <View key={index} style={{ marginHorizontal: 5 }}>
                        <CategoryItem
                            name={category.name}
                            isActive={category.isActive}
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}
