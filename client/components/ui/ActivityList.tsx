import { Activity } from '../../constants/types';
import { InPersonActivityItem } from '@/components/ui/InPersonActivityItem';
import React, { useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ActivityDetailsPopup from './ActivityDetailsPopup';
import useCalendarStore from '@/store/CalendarStore';
import { useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const ActivityList: React.FC<{ activities: Activity[] }> = ({ activities }) => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const route = useRoute();
    const isInPersonScreen = route.name === 'InPerson';

    const handlePress = (activity: Activity) => {
        setSelectedActivity(activity);
        setModalVisible(true);
    };

    const handleClose = () => {
        setSelectedActivity(null);
        setModalVisible(false);
    };

    const addEvent = useCalendarStore((state) => state.addEvent);
    const addNotification = useCalendarStore((state) => state.addNotification);
    const handleBook = (activity: Activity) => {
        console.log('handlebook', activity);
        const days = activity.days.split(',').map(day => day.trim());
        days.forEach(day => {
            const formattedDate = getFormattedDate(day);

            function getFormattedDate(day: string): string {
                const today = new Date();
                const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    .findIndex(d => d.toLowerCase() === day.toLowerCase());

                let nextDate = new Date(today);
                nextDate.setDate(today.getDate() + ((7 + dayIndex - today.getDay()) % 7));

                return nextDate.toISOString().split('T')[0];
            }

            const activityColors = {
                InPersonActivity: 'lightblue',
                online: 'lightgreen',
                personal: 'orange',
                nutrition: 'peachpuff',

              };
              
              const highlightColor = activityColors[activity.type as keyof typeof activityColors] || 'gray';


            const timeStart = activity.time.substring(0, activity.time.indexOf('-')).trim();
            const timeEnd = activity.time.substring(activity.time.indexOf('-') + 1).trim();

            const hasConflict = useCalendarStore.getState().events.some(event => {
                const existingDate = event.date;
                const existingStartTime = event.activity.time.substring(0, 7).trim();
                const existingEndTime = event.activity.time.substring(9, 17).trim();

                if (existingDate !== formattedDate) return false;

                const convertTo24HourFormat = (time: string): number => {
                    console.log('time', time);
                    const [hourMinute, period] = time.split(/(AM|PM)/i);
                    let [hour, minute] = hourMinute.split(':').map(Number);
                    if (period.toLowerCase() === 'pm' && hour !== 12) hour += 12;
                    if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
                    return hour * 60 + minute; // Convert to minutes for easier comparison
                };

                const startMinutes = convertTo24HourFormat(timeStart);
                const endMinutes = convertTo24HourFormat(timeEnd);
                const existingStartMinutes = convertTo24HourFormat(existingStartTime);
                const existingEndMinutes = convertTo24HourFormat(existingEndTime);

                return (
                    (startMinutes >= existingStartMinutes && startMinutes < existingEndMinutes) ||
                    (endMinutes > existingStartMinutes && endMinutes <= existingEndMinutes) ||
                    (startMinutes <= existingStartMinutes && endMinutes >= existingEndMinutes)
                );
            });

            console.log('hasConflict', hasConflict);
            if (hasConflict) {
                // **Add Notification**
                addNotification(
                    `${activity.title}`,
                    `Conflict ${day} at ${activity.time} at ${activity.location}.`
                );
                return;
            }

            addEvent({
                id: uuidv4(),
                title: activity.title,
                date: formattedDate,
                selected: true,
                selectedColor: highlightColor,
                activity: activity,
            });
            // **Add Notification**
            addNotification(
                `${activity.title}`,
                `Your class is booked for ${day} at ${activity.time} at ${activity.location}.`
            );
        });

        handleClose();
    };


    return (
        <View style={{ flex: 1 }}>
        <FlatList
            data={activities}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
                    <InPersonActivityItem activity={item} />
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        {modalVisible && selectedActivity && (
            <ActivityDetailsPopup
                visible={modalVisible}
                activity={selectedActivity}
                handleClose={handleClose}
                handleBook={() => handleBook(selectedActivity)}
            />
        )}
    </View>
    );
};

