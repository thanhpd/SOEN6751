import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Category } from '../constants/types'
import { Colors } from '@/constants/Colors'
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
    <Text className={` ${isActive ? '' : ' text-black'}`}>{name}</Text>
)

export const CategoryList: React.FC = () => {
    return (
        <View className="mb-1">
            <View className="items-center">
                <Text className="text-black text-2xl font-bold">Categories</Text>
            <View className="flex-row flex-wrap justify-center mt-4">
                {categories.map((category, index) => (
                    <View key={index} className="mx-2 my-1">
                        <TouchableOpacity onPress={() => console.log(`${category.name} clicked`)}>
                            <CategoryItem 
                                name={category.name}
                                isActive={category.isActive}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
                </View>
            </View>
        </View>
    )
}
