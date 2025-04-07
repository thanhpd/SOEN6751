import React from 'react'
import { ScrollView } from 'react-native'
import ProfileHeader from '@/components/ProfileHeader'
import SettingsSection from '@/components/SettingsSection'
import { router } from 'expo-router'
import { useSignOut } from '@/hooks/useSignOut'
import { useAuth } from '@/hooks/useAuth'
import GamificationSection from '@/components/GamificationSection'

const Profile: React.FC = () => {
    const { currentUser } = useAuth()

    return (
        <ScrollView className="flex-1 bg-gray-50 relative">
            <ProfileHeader
                name={`${currentUser?.firstName} ${currentUser?.lastName}`}
                email={currentUser?.email || ''}
                avatar={currentUser?.avatar || ''}
                onEditPress={() => {
                    router.push('/ProfileDetails' as any)
                }}
            />
            {currentUser?.gamificationToggle && (
                <GamificationSection
                    streak={currentUser?.gamificationProgress}
                />
            )}
            <SettingsSection />
        </ScrollView>
    )
}

export default Profile
