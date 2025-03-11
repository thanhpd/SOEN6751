import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { View } from 'react-native'

interface AuthTabsProps {
    activeTab: 'login' | 'register'
    onTabChange: (tab: 'login' | 'register') => void
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <View className="w-[295px] h-[54px] relative flex bg-[#D9D9D9] mt-3.5 rounded-[28px] max-sm:w-full">
            <View
                className={`absolute top-1 left-1 w-36 h-[46px] bg-white rounded-[28px] transition-all duration-300 ease-in-out ${
                    activeTab === 'login'
                        ? 'translate-x-0'
                        : 'translate-x-[147px]'
                }`}
            />
            <Button
                className={`w-36 h-[46px] font-bold text-sm leading-[18.2px] cursor-pointer rounded-[28px] z-10 flex items-center justify-center ${
                    activeTab === 'login' ? 'text-[#98243C]' : 'text-black'
                }`}
                onPress={() => onTabChange('login')}
            >
                Login
            </Button>
            <Button
                className={`w-36 h-[46px] font-bold text-sm leading-[18.2px] cursor-pointer rounded-[28px] z-10 flex items-center justify-center ${
                    activeTab === 'register' ? 'text-[#98243C]' : 'text-black'
                }`}
                onPress={() => onTabChange('register')}
            >
                Register
            </Button>
        </View>
    )
}

export default AuthTabs
