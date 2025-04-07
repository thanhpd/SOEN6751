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
} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import CalendarComponent from '@/components/ui/CalendarComponent'

const { width } = Dimensions.get('window')

const cards = [
    {
        id: '1',
        title: 'In Person Activities',
        path: 'InPersonActivity',
        image: require('@/assets/images/hero.png'),
        bgColor: 'rgba(52, 152, 219, 1)',
        icon: 'person-running',
        iconSize: 18,
    },
    {
        id: '2',
        title: 'Online Activities',
        path: 'online',
        image: require('@/assets/images/online.png'),
        bgColor: 'rgba(39, 174, 96, 1)',
        icon: 'laptop',
        iconSize: 15,
    },
    {
        id: '3',
        title: 'Personal Training',
        path: 'training',
        image: require('@/assets/images/training.jpg'),
        bgColor: 'rgba(230, 126, 34, 1)',
        icon: 'dumbbell',
        iconSize: 15,
    },
    {
        id: '4',
        title: 'Nutrition Consultation',
        path: 'nutrition',
        image: require('@/assets/images/nutrition.jpg'),
        bgColor: 'rgba(192, 57, 43, 1)',
        icon: 'apple-whole',
        iconSize: 16,
    },
]

// 🔹 Header component
const ListHeader = () => (
    <View style={styles.textContainer}>
        <Text style={styles.smallText}>Lock in Your</Text>
        <Text style={styles.bigBoldText}>Next Fitness Move</Text>
        <Text style={styles.captionText}>
            Choose from in-person & online activities, personal training, or nutrition sessions.
        </Text>
    </View>
)

export default function BookingPage() {
    const router = useRouter()

    const handlePress = (path: string) => {
        router.push(path as any)
        console.log('Button Pressed:', path)
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
            style={{ width: width / 2 - 30, height: width / 2 - 90 }}
            className="m-2 rounded-lg overflow-hidden"
            onPress={() => handlePress(item.path)}
        >
            <ImageBackground
                source={item.image}
                className="flex-1 justify-center items-center w-full h-full"
                imageStyle={{ borderRadius: 10 }}
            >
                <View
                    style={{ backgroundColor: item.bgColor }}
                    className="absolute inset-0 rounded-lg"
                />
                <View className="p-5">
                    <Text className="text-white text-lg font-bold text-center">
                        {item.title}
                    </Text>
                </View>
                <View
                    className="absolute top-2 right-2 rounded-full p-1 justify-center items-center h-8 w-8"
                    style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
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
        <View style={styles.pageContainer}>
        <FlatList
            data={cards}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            ListHeaderComponent={<ListHeader />}
            ListFooterComponent={<CalendarComponent />}
            showsVerticalScrollIndicator={false}

        />
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        paddingLeft: 10,
        paddingVertical: 15,
        paddingRight :25,
    },
    smallText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 2,
    },
    bigBoldText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 2,
    },
    captionText: {
        fontSize: 13,
        color: '#666',
    },
    pageContainer: {
        paddingHorizontal: 10, // You can increase this value as needed
        flex: 1,
    },
})
