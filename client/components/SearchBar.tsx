// components/SearchBar.tsx
import React from 'react'
import { View, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function SearchBar({ searchText, setSearchText }: { searchText: string, setSearchText: (text: string) => void }) {
    return (
        <View className="flex-row items-center bg-white rounded-lg p-2 mx-5 my-2">
            <FontAwesome name="search" size={18} color="#888" className="mr-2" />
            <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="Enter Keywords..."
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={setSearchText}
            />
        </View>
    )
}
