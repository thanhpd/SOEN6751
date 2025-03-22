import PaymentBackground from '@/components/payment/PaymentBackground'
import { Button } from '@/components/primitives/button'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '@/store'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { format } from 'date-fns'
import LogoMastercard from '@/components/payment/images/LogoMastercard'
import LogoVisa from '@/components/payment/images/LogoVisa'
import useCalendarStore from '@/stores/CalendarStore'
import { addCalendarEvent } from '../../store/CalendarDb';
import { setCalendarEvents } from '../../store/CalendarDb';



const PaymentCompleted = () => {
    const { currentUser } = useAuth()
    const{addEvent} = useCalendarStore()
    const order = useAppSelector(state => state.currentOrder)
    const dispatch = useAppDispatch();

    let count = 0;
    

    const handleConfirm = (): void => {
        

        const newEvent ={
                    id: order?.activity?.date || '',
                    title: order?.product?.name || '',
                    date: order?.activity?.date || '',
        
                    selected: true,
                    selectedColor: order?.activity?.color || '',
                    activity: {
                        title: order?.product?.name || '',
                        instructor: order?.activity?.Instructor || '',
                        location: order?.activity?.location || '',
                        days: 'Tuesday',
                        time: order?.activity?.time || '',
                        description: order?.activity?.description || '',
                        price: Number(order?.product?.price) || 0,
                        inPerson: false
                    },
                    user_id :currentUser?.id || ''
                }

                console.log("New Event" ,newEvent)
                dispatch(addCalendarEvent(newEvent));

                

                setTimeout(() => {
                    router.push('/(tabs)/booking');
                }, 500);
                

    }

    


    
        
     


      
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
