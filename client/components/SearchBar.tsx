import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Colors } from '@/constants/Colors';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.searchContainer}>
      <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Enter Keywords..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    
    
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
