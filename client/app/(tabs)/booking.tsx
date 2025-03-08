import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

const cards = [
    { id: '1', title: 'In Person Activities', path: 'in-person' },
    { id: '2', title: 'Online Activities', path: 'online' },
    { id: '3', title: 'Personal Training', path: 'training' },
    { id: '4', title: 'Nutrition Consultation', path: 'nutrition' },
];

export default function BookingPage() {

    const router = useRouter(); // Use Expo Router for navigation

    const handlePress = (path: string) => {
        router.push(path as any); // Navigate to the selected screen
    };



const renderItem = ({ item }: { item: { path: string; id: string; title: string } }) => (
        <TouchableOpacity style={styles.card}  onPress={() => handlePress(item.path)}>
            <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2} // Two columns
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    listContainer: {
        alignItems: 'center',
        
    },
    card: {
        backgroundColor: '#3498db',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: (width / 2) - 40, // Each card takes half of the screen width minus margins
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
