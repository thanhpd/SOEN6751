import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface EventDetailsPopupProps {
    visible: boolean;
    activity: {
        title: string;
        instructor: string;
        location: string;
        days: string;
        time: string;
    };
    month: string;
    handleClose: () => void;
}

const EventDetailsPopup: React.FC<EventDetailsPopupProps> = ({ visible, month, activity, handleClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '80%', backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleClose} style={{ marginRight: 10 }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>←</Text>
                            </TouchableOpacity>
                            <Text>{month}</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 1 }}>Event Details</Text>
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{activity.title}</Text>
                    <Text>Instructor: {activity.instructor}</Text>
                    <Text>Location: {activity.location}</Text>
                    <Text>Days: {activity.days}</Text>
                    <Text>Time: {activity.time}</Text>
                </View>
            </View>
        </Modal>
    );
};

export default EventDetailsPopup;