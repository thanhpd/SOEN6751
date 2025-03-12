import LoginForm from '@/app/auth/LoginForm'
import RegisterForm from '@/app/auth/RegisterForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const tabs = [
    {
        title: 'Login',
        value: 'login',
    },
    {
        title: 'Register',
        value: 'register',
    },
]

const AuthLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as 'login' | 'register')
    }

    return (
        <SafeAreaView className="flex flex-1 justify-center items-center bg-red">
            <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-[87%] flex flex-col gap-[26px] h-full"
            >
                <View className="w-full bg-white rounded-[24px] py-7 px-11 flex-shrink-0">
                    <Text className="text-center leading-[1.6] text-sm font-default-700">
                        Hello There
                    </Text>
                    <Text className="text-center leading-[1.3] text-2xl text-red mt-1 font-default-500">
                        Welcome to LeGym
                    </Text>
                    <TabsList className="flex-row w-full mt-[14px] bg-[#D9D9D9] rounded-[28px] native:h-[54px]">
                        {tabs.map(tab => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={cn(
                                    'flex-1 native:h-[48px] bg-[#D9D9D9] rounded-[28px]',
                                    activeTab === tab.value && 'bg-red'
                                )}
                            >
                                <Text
                                    className={clsx(
                                        'leading-[1.3] text-[14px] font-default-700',
                                        activeTab === tab.value
                                            ? 'text-[#D9D9D9]'
                                            : 'text-[#6E7781]'
                                    )}
                                >
                                    {tab.title}
                                </Text>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </View>
                <TabsContent value="login" className="flex-1 block">
                    <View className="bg-white rounded-t-[30px] py-10 px-6">
                        <LoginForm />
                    </View>
                </TabsContent>
                <TabsContent value="register" className="flex-1 block">
                    <View className="bg-white rounded-t-[30px] py-10 px-6">
                        <RegisterForm />
                    </View>
                </TabsContent>
            </Tabs>
        </SafeAreaView>
    )
}

export default AuthLayout
