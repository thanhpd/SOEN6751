import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window'); // Get screen width

const cards = [
    { 
        id: '1', 
        title: 'In Person Activities', 
        path: 'in-person', 
        bgColor: '#3498db', // Blue
        icon: 'person-running', 
        iconSize: 18, // Unique icon size
        circleColor: '#2980b9' // Darker blue
    },
    { 
        id: '2', 
        title: 'Online Activities', 
        path: 'online', 
        bgColor: '#27ae60', // Green
        icon: 'laptop', 
        iconSize: 15, // Unique icon size
        circleColor: '#1e8449' // Darker green
    },
    { 
        id: '3', 
        title: 'Personal Training', 
        path: 'training', 
        bgColor: '#e67e22', // Orange
        icon: 'dumbbell', 
        iconSize: 15, // Unique icon size
        circleColor: '#d35400' // Darker orange
    },
    { 
        id: '4', 
        title: 'Nutrition Consultation', 
        path: 'nutrition', 
        bgColor: '#c0392b', // Red
        icon: 'apple-whole', 
        iconSize: 16, // Unique icon size
        circleColor: '#922b21' // Darker red
    },
];

export default function BookingPage() {

    const router = useRouter(); // Use Expo Router for navigation

    const handlePress = (path: string) => {
        router.push(path as any); // Navigate to the selected screen
    };

    const renderItem = ({ item }: { item: { path: string; id: string; title: string; bgColor: string; icon: string; circleColor: string; iconSize: number } }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: item.bgColor }]} onPress={() => handlePress(item.path)}>
            <Text style={styles.cardText}>{item.title}</Text>
            

            {/* Circular container with unique icon */}
            <View style={[styles.iconContainer, { backgroundColor: item.circleColor }]}>
                <FontAwesome6 name={item.icon} size={item.iconSize} color="white" />
            </View>
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
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: (width / 2) - 40, // Each card takes half of the screen width minus margins
        position: 'relative', // Important for placing the icon container
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 15, // Make the container circular
        padding: 1, // Add some padding to the icon
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
    },

    cardTextContainer: {
        borderRadius: 10,
        padding: 5,
        
    },
});
