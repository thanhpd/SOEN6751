import { Activity } from '../../constants/types'
import { ActivityItem } from '@/components/ui/ActivityItem'
import React, { useState } from 'react'
import { View, FlatList, SafeAreaView, StatusBar, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ActivityDetailsPopup from './ActivityDetailsPopup';

export const ActivityList = () => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handlePress = (activity: Activity) => {
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    const handleClose = () => {
        setSelectedActivity(null);
        setModalVisible(false);
    };

    return (
        <View>
            <FlatList style={styles.list}
            data={activityItems}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
                <ActivityItem activity={item} />
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
         {modalVisible && selectedActivity && (
             <ActivityDetailsPopup visible={modalVisible} activity={selectedActivity} handleClose={handleClose} handleBook={function (): void {
                    throw new Error('Function not implemented.');
                } } />
         )}
         </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { flexGrow: 1 },

});
const activityItems: Activity[] = [
    {
        title: 'Cardio Dance',
        instructor: 'Danielle Hubbard',
        location: 'SGW – Le Gym – Studio C',
        price: '$100',
        description:
            'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Monday, Wednesday, Friday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Zumba Fitness',
        instructor: 'Veronica Aguirre',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$55',
        description:
            'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Tuesday, Thursday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Total Body Fitness',
        instructor: 'Daphne Cunliffe',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
        days: 'Monday, Wednesday, Friday',
        time: '12:00 PM – 1:00 PM',
    },
    {
        title: 'Hard Core',
        instructor: 'Vila Woo',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
        days: 'Tuesday, Thursday',
        time: '12:00 PM – 1:00 PM',
    },

    {
        title: 'Cardio Dance',
        instructor: 'Danielle Hubbard',
        location: 'SGW – Le Gym – Studio C',
        price: '$100',
        description:
            'Cardio Dance is a high-energy class that combines dance and fitness. It incorporates a variety of dance styles, including hip-hop, jazz, and Latin. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Monday, Wednesday, Friday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Zumba Fitness',
        instructor: 'Veronica Aguirre',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$55',
        description:
            'Zumba Fitness is a dance-based fitness class that incorporates Latin and international music. The class is designed to improve cardiovascular fitness, coordination, and rhythm.',
        days: 'Tuesday, Thursday',
        time: '5:30 PM – 6:30 PM',
    },
    {
        title: 'Total Body Fitness',
        instructor: 'Daphne Cunliffe',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Total Body Fitness is a full-body workout that incorporates strength training, cardio, and flexibility exercises. The class is designed to improve overall fitness and strength.',
        days: 'Monday, Wednesday, Friday',
        time: '12:00 PM – 1:00 PM',
    },
    {
        title: 'Hard Core',
        instructor: 'Vila Woo',
        location: 'SGW – Le Gym – Gymnasium',
        price: '$100',
        description:
            'Hard Core is an intense core workout that targets the abdominal muscles, obliques, and lower back. The class is designed to improve core strength, stability, and endurance.',
        days: 'Tuesday, Thursday',
        time: '12:00 PM – 1:00 PM',
    },
];