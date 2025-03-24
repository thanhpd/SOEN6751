import React from 'react'
import { ScrollView } from 'react-native'
import ProfileHeader from '@/components/ProfileHeader'
import WeeklyActivity from '@/components/WeeklyActivity'
import SettingsSection from '@/components/SettingsSection'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LogOutIcon from '@/components/icons/LogOutIcon'
import { router } from 'expo-router'
import { useSignOut } from '@/hooks/useSignOut'
// import MoreOptionsSection from "./MoreOptionsSection";

const Profile: React.FC = () => {
    const signOut = useSignOut()

    return (
        <ScrollView className="flex-1 bg-gray-50 relative relative" style = {{marginBottom : 100,}}>
           
            <TouchableOpacity
                containerStyle={{
                    width: 30,
                    height: 30,
                    backgroundColor: 'rgb(152, 36, 60)',
                    borderRadius: 6,
                    position: 'absolute',
                    right: 18,
                    top: 23,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                accessibilityLabel="Log Out"
                onPress={signOut}
            >
                <LogOutIcon />
            </TouchableOpacity>
            <ProfileHeader
                name="Mahim Rahman"
                email="mahim@gmail.com"
                avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/9f59753e6c945de3eae836cbfd7d48d387c27c44dd67926552a5a077f4146122?placeholderIfAbsent=true&apiKey=650a6d7feb6041edbb7dcb01545c3ece"
                streak={102}
                onEditPress={() => {
                    router.push('/ProfileDetails' as any)
                }}
            />

            <WeeklyActivity />

            <SettingsSection />
        </ScrollView>
    )
}

export default Profile
