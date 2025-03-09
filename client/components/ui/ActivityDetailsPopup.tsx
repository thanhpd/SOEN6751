import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors'
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
    handleBook: () => void;
}

const ActivityDetailsPopup: React.FC<ActivityDetailsPopupProps> = ({ visible, activity, handleClose,handleBook }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-white p-5 rounded-lg">
                    <Text className="text-2xl font-bold text-center" style={{ color: Colors.concordia.text }}>{activity.title}</Text>
                    <Text className="text-xl text-center">{activity.instructor}</Text>
                    <View className="my-2">
                    <Text>Description: {activity.description}</Text>
                    <View className="my-2">
                    <View className="flex-row items-center">
                        <Image
                        source={require('../../assets/images/location_icon.png')}
                        className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">{activity.location}</Text>
                    </View>
                    <View className="flex-row items-center">
                    <Image
                        source={require('../../assets/images/Dollar Coin.png')}
                        className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">{activity.price}</Text>
                    </View>
                    <View className="flex-row items-center">
                    <Image
                        source={require('../../assets/images/Wednesday.png')}
                        className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">{activity.days}</Text>
                    </View>
                    <View className="flex-row items-center">
                    <Image
                        source={require('../../assets/images/Clock.png')}
                        className="w-5 h-5"
                        />
                        <Text className="ml-2 font-bold">{activity.time}</Text>
                    </View>
                    </View>
                    
                    <View className="flex-row justify-between mt-2">
                        {/* Close Button */}
                        <TouchableOpacity onPress={handleClose} className="bg-white p-3 rounded-lg border border-gray-300">
                            <Text className="text-center text-gray-600">Close</Text>
                        </TouchableOpacity>
                        {/* Book Button */}
                        <TouchableOpacity onPress={handleBook} className="bg-blue-600 p-3 rounded-lg "style={{ backgroundColor: Colors.concordia.background }}>
                            <Text className="text-center text-white">Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
        </Modal>
    );
};

export default ActivityDetailsPopup;
