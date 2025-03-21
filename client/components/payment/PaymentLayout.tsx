import CardManagementList from '@/components/payment/CardManagementList'
import BookmarkIcon from '@/components/payment/images/BookmarkIcon'
import PaymentSelection from '@/components/payment/PaymentSelection'
import { TCardSchema } from '@/components/payment/schema'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/primitives/tabs'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

type PaymentLayoutProps = {
    mode?: 'order' | 'management'
    onMethodSubmit?: (card: TCardSchema) => void
}

const PaymentLayout = ({
    mode = 'order',
    onMethodSubmit,
}: PaymentLayoutProps) => {
    const [selectedTab, setSelectedTab] = useState<'select' | 'saved'>('select')

    return (
        <View className="flex-1">
            <Tabs
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
                        <Image
                            source={require('@/components/payment/images/card.png')}
                            className="w-[47px] h-[32px]"
                        />
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
                        <View className="flex flex-col items-center gap-1">
                            <BookmarkIcon />
                            <Text>Saved cards</Text>
                        </View>
                    </TabsTrigger>
                </TabsList>
                <ScrollView className="flex flex-col flex-1">
                    <TabsContent value="select">
                        <PaymentSelection
                            mode={mode}
                            onMethodSubmit={onMethodSubmit}
                        />
                    </TabsContent>
                    <TabsContent value="saved">
                        <CardManagementList />
                    </TabsContent>
                </ScrollView>
            </Tabs>
        </View>
    )
}

export default PaymentLayout
