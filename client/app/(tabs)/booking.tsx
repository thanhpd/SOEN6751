import { useRouter } from 'expo-router'
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ScrollView,
} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import CalendarComponent from '@/components/ui/CalendarComponent'

const { width } = Dimensions.get('window') // Get screen width

const cards = [
    {
        id: '1',
        title: 'In Person Activities',
        path: 'InPersonActivity',
        image: require('@/assets/images/hero.png'),
        bgColor: 'rgba(52, 152, 219, 0.7)', // Blue with transparency
        icon: 'person-running',
        iconSize: 18,
    },
    {
        id: '2',
        title: 'Online Activities',
        path: 'online',
        image: require('@/assets/images/online.png'),
        bgColor: 'rgba(39, 174, 96, 0.5)', // Green with transparency
        icon: 'laptop',
        iconSize: 15,
    },
    {
        id: '3',
        title: 'Personal Training',
        path: 'training',
        image: require('@/assets/images/training.jpg'),
        bgColor: 'rgba(230, 126, 34, 0.6)', // Orange with transparency
        icon: 'dumbbell',
        iconSize: 15,
    },
    {
        id: '4',
        title: 'Nutrition Consultation',
        path: 'nutrition',
        image: require('@/assets/images/nutrition.jpg'),
        bgColor: 'rgba(192, 57, 43, 0.6)', // Red with transparency
        icon: 'apple-whole',
        iconSize: 16,
    },
]

export default function BookingPage() {
    const router = useRouter()

    const handlePress = (path: string) => {
        router.push(path as any)
    }

    const renderItem = ({
        item,
    }: {
        item: {
            path: string
            id: string
            title: string
            image: any
            bgColor: string
            icon: string
            iconSize: number
        }
    }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.path)}
        >
            <ImageBackground
                source={item.image}
                style={styles.backgroundImage}
                imageStyle={{ borderRadius: 10 }}
            >
                {/* Semi-transparent colored overlay */}
                <View
                    style={[styles.overlay, { backgroundColor: item.bgColor }]}
                />

                {/* Card Content */}
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>{item.title}</Text>
                </View>
                {/* Circular icon container */}
                <View style={styles.iconContainer}>
                    <FontAwesome6
                        name={item.icon}
                        size={item.iconSize}
                        color="white"
                    />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />
            <CalendarComponent />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 20,
    },
    listContainer: {
        alignItems: 'center',
    },
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden', // Ensures rounded corners
        height: 120,
        width: width / 2 - 40,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Covers the entire card
        borderRadius: 10,
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
        borderRadius: 15,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        backgroundColor: 'rgba(255,255,255,0.3)', // Transparent icon background
    },

    cardTextContainer: {
        padding: 10,
    },
})
