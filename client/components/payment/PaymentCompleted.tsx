import PaymentBackground from '@/components/payment/PaymentBackground'
import { Button } from '@/components/primitives/button'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '@/store'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import LogoMastercard from '@/components/payment/images/LogoMastercard'
import LogoVisa from '@/components/payment/images/LogoVisa'

import { addCalendarEvent } from '../../store/CalendarDb';
import { setCalendarEvents } from '../../store/CalendarDb';
import { addDays, format, parseISO, isAfter, isBefore } from "date-fns";




const PaymentCompleted = () => {
    const { currentUser } = useAuth()
    
    const order = useAppSelector(state => state.currentOrder)
    const dispatch = useAppDispatch();
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

    const getFutureDates = (daysArray: string[], startDate: Date, endDate: Date) => {
        const dayMap = {
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
            Sunday: 0,
        };
    
        let futureDates = [];
        let checkDate = new Date(startDate);
        
        // Ensure the start date is at least today's date
        checkDate.setHours(0, 0, 0, 0); // Set the check date time to midnight
        
        while (checkDate <= endDate) {
            let dayName = format(checkDate, "EEEE"); // Get full day name, e.g., "Monday"
            
            console.log("daysArray",daysArray)
            console.log("daysArray[0]",daysArray[0])
            console.log("daysArray[1]",daysArray[1])
            if (daysArray.map(day => day.trim()).includes(dayName)) {

                futureDates.push(format(checkDate, "yyyy-MM-dd")); // Format as needed
            }
    
            checkDate = addDays(checkDate, 1); // Move to the next day
        }
    
        return futureDates;
    };
    
    
    // Extract activity details
    
    

    const handleConfirm = (): void => {
        const activityType = order?.activity?.type;
        const activityDays = order?.activity?.days ? order.activity.days.split(",") : [];
    
        // Set date range
        const today = new Date();
        const activityStartDate = order?.activity?.date ? parseISO(order?.activity?.date) : today;
        const minStartDate = isBefore(activityStartDate, today) ? today : activityStartDate; // Ensure start date is at least today
        const maxEndDate = new Date("2025-06-30");
    
        let eventDates: string[] = [];
    
        if (activityType === "InPerson" || activityType === "Online") {
            // Generate future dates based on activity days
            eventDates = getFutureDates(activityDays as string[], minStartDate, maxEndDate);
        } else {
            // If it's another type, just use the given date if valid
            eventDates = order?.activity?.date ? [order.activity.date] : [];
        }
    
        // Loop through each date and dispatch events
        console.log("actvity Type", activityType)
        console.log("actvity Days", activityDays)
        console.log("activity Day" , order?.activity?.days)
        console.log("Event dates", eventDates)

        eventDates.forEach((date) => {
            const newEvent = {
                id: date + order?.product?.name + currentUser?.id || "",
                title: order?.product?.name || "",
                date: date,
    
                activity: {
                    title: order?.product?.name || "",
                    instructor: order?.activity?.Instructor || "",
                    location: order?.activity?.location || "",
                    days: Array.isArray(activityDays) ? activityDays.join(", ") : "",
                    time: order?.activity?.time || "",
                    description: order?.activity?.description || "",
                    price: Number(order?.product?.price) || 0,
                    type: activityType || "",
                },
                user_id: currentUser?.id || "",
            };
    
            
             dispatch(addCalendarEvent(newEvent));
             setTimeout(() => {
                console.log("New Event", newEvent.date);
            }, 1500);
        });
    
        // Navigate to booking after delay
        setTimeout(() => {
            router.push('/(tabs)/booking');
        }, 500);
    };

    


    
        
     


      
    const CardBrand =
        order?.paymentMethod?.cardBrand === 'mastercard'
            ? LogoMastercard
            : LogoVisa

    return (
        <ScrollView contentContainerClassName="relative flex-col items-center">
            {order && (
                <View className="relative flex-col items-center w-[350px] h-[722px]">
                    <PaymentBackground />
                    <View className="absolute top-[100px] left-0 right-0 bottom-0 flex flex-col justify-items-center pt-[20px] w-full h-full">
                        <View className="flex flex-col items-center">
                            <Text className="text-2xl font-medium">
                                Thank you!
                            </Text>
                            <Text className="text-xl">
                                Your transaction was successful
                            </Text>
                            <View className="flex-row justify-between items-center mt-[40px] w-full px-[22px]">
                                <Text className="text-lg">Date</Text>
                                <Text className="text-lg font-semibold">
                                    {format(new Date(), 'dd MMM yyyy')}
                                </Text>
                            </View>
                            <View className="flex-row justify-between items-center mt-[10px] w-full px-[22px]">
                                <Text className="text-lg">Time</Text>
                                <Text className="text-lg font-semibold">
                                    {format(new Date(), 'p')}
                                </Text>
                            </View>
                            <View className="flex-row justify-between items-center mt-[10px] w-full px-[22px]">
                                <Text className="text-lg">To</Text>
                                <Text className="text-lg font-semibold">
                                    {currentUser?.email}
                                </Text>
                            </View>
                            <View className="flex my-6 h-[2px] bg-[#C7C7C7] w-11/12 mx-[11px]" />
                            <View className="flex-row justify-between items-center w-full px-[22px]">
                                <Text className="text-2xl font-semibold">
                                    Total
                                </Text>
                                <Text className="text-2xl font-semibold">
                                    ${Number(order.total).toFixed(2)}
                                </Text>
                            </View>
                            <View className="px-[22px] h-[75px] flex w-full mt-[25px]">
                                <View className="bg-white rounded-[15px] w-full h-full flex-row justify-between items-center px-4 gap-6">
                                    <View>
                                        <CardBrand width={50} height={50} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-medium">
                                            Credit Card
                                        </Text>
                                        <Text>
                                            {order.paymentMethod?.cardBrand ===
                                            'mastercard'
                                                ? 'Mastercard'
                                                : 'Visa'}{' '}
                                            {order.paymentMethod?.cardNumber?.slice(
                                                -4
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="flex flex-col items-center">
                            <View className="flex my-6 h-[2px] border border-dashed border-[#C7C7C7] w-10/12 mx-[22px]" />
                            <View className="w-[200px] ">
                                <Button
                                    variant="outline"
                                    className="h-[60px]"
                                    onPress={() =>
                                        handleConfirm()
                                    }
                                >
                                    <Text className="text-xl font-medium text-red leading-[1.2]">
                                        View calendar
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

export default PaymentCompleted
