import React, { useState } from 'react'
import AuthTabs from '@/app/auth/AuthTabs'
// import LoginForm from '@/app/auth/LoginForm'
import { Text, View } from 'react-native'

const AuthLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

    const handleTabChange = (tab: 'login' | 'register') => {
        setActiveTab(tab)
    }

    return (
        <View className="flex justify-center items-center min-h-screen bg-gray-100">
            <View className="w-[440px] min-h-screen box-border bg-[#98243C] pt-1.5 pb-0 px-7 max-md:w-full max-md:pt-1.5 max-md:pb-0 max-md:px-5 max-sm:pt-1.5 max-sm:pb-0 max-sm:px-4">
                {/* Greeting Section with Tabs */}
                <View className="flex flex-col items-center gap-3.5 bg-white px-11 py-[29px] rounded-3xl max-sm:p-5">
                    <View className="text-center">
                        <Text className="font-bold text-sm text-black leading-[22.4px] capitalize mb-1">
                            Hello, There
                        </Text>
                        <Text className="font-medium text-2xl text-[#98243C] leading-[31.2px]">
                            Welcome to LeGym
                        </Text>
                    </View>

                    <AuthTabs
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                </View>

                {/* Login Form */}
                {activeTab === 'login' ? (
                    <Text>Login</Text>
                ) : (
                    <Text>Register</Text>
                )}
            </View>
        </View>
    )
}

export default AuthLayout
