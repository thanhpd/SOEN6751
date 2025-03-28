import React from 'react'
import { ScrollView } from 'react-native'
import ProfileHeader from '@/components/ProfileHeader'
import WeeklyActivity from '@/components/WeeklyActivity'
import SettingsSection from '@/components/SettingsSection'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LogOutIcon from '@/components/icons/LogOutIcon'
import { router } from 'expo-router'
import { useSignOut } from '@/hooks/useSignOut'
import { useAuth } from '@/hooks/useAuth'
// import MoreOptionsSection from "./MoreOptionsSection";

const Profile: React.FC = () => {
    const { currentUser } = useAuth()
    const signOut = useSignOut()

    return (
        <ScrollView className="flex-1 bg-gray-50 relative">
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
                name={`${currentUser?.firstName} ${currentUser?.lastName}`}
                email={currentUser?.email || ''}
                avatar={currentUser?.avatar || ''}
                streak={6}
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
