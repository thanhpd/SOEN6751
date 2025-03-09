import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface ActivityDetailsPopupProps {
    visible: boolean;
    activity: {
        title: string;
        instructor: string;
        location: string;
        price: string;
        description: string;
        days: string;
        time: string;
    };
    handleClose: () => void;
}

const ActivityDetailsPopup: React.FC<ActivityDetailsPopupProps> = ({ visible, activity, handleClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{activity.title}</Text>
                    <Text>Instructor: {activity.instructor}</Text>
                    <Text>Location: {activity.location}</Text>
                    <Text>Price: {activity.price}</Text>
                    <Text>Description: {activity.description}</Text>
                    <Text>Days: {activity.days}</Text>
                    <Text>Time: {activity.time}</Text>
                    <TouchableOpacity onPress={handleClose} style={{ marginTop: 20 }}>
                        <Text style={{ color: 'blue', textAlign: 'center' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ActivityDetailsPopup;