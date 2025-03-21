import CardManagementList from '@/components/payment/CardManagementList'
import PaymentCompleted from '@/components/payment/PaymentCompleted'
import PaymentSelection from '@/components/payment/PaymentSelection'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/primitives/tabs'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Payment = () => {
    const [selectedTab, setSelectedTab] = useState<'select' | 'saved'>('select')

    return (
        <>
            <PaymentCompleted />
            {/* <Tabs
                value={selectedTab}
                onValueChange={value =>
                    setSelectedTab(value as 'select' | 'saved')
                }
                className="bg-white flex flex-col flex-1"
            >
                <TabsList className="flex flex-row gap-[18px] justify-center bg-white min-h-[80px]">
                    <TabsTrigger
                        value="select"
                        className={clsx(
                            'rounded-2xl w-[110px] h-[60px] items-center  justify-center bg-white',
                            selectedTab === 'select'
                                ? 'border-2 border-red shadow shadow-red'
                                : 'border border-black/50'
                        )}
                    >
                        <Text>Select card</Text>
                    </TabsTrigger>
                    <TabsTrigger
                        value="saved"
                        className={clsx(
                            'rounded-2xl w-[110px] h-[60px] items-center  justify-center bg-white',
                            selectedTab === 'saved'
                                ? 'border-2 border-red shadow shadow-red'
                                : 'border border-black/50'
                        )}
                    >
                        <Text>Saved cards</Text>
                    </TabsTrigger>
                </TabsList>
                <ScrollView className="flex flex-col flex-1">
                    <TabsContent value="select">
                        <PaymentSelection />
                    </TabsContent>
                    <TabsContent value="saved">
                        <CardManagementList />
                    </TabsContent>
                </ScrollView>
            </Tabs> */}
        </>
    )
}

export default Payment
