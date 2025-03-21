import React, { useState } from 'react'
import ResetPasswordEmailForm from './ResetPasswordEmailForm'
import ResetPasswordOTPForm from './ResetPasswordOTPForm'
import ResetPasswordForm from './ResetPasswordForm'
import { BaseAccount } from '@/constants/types'
import { Toast } from 'toastify-react-native'
type TResetPasswordManagerStep = 'email' | 'otp' | 'password'

type TResetPasswordManagerProps = {
    onClose: () => void
}

const ResetPasswordManager = ({ onClose }: TResetPasswordManagerProps) => {
    const [step, setStep] = useState<TResetPasswordManagerStep>('email')

    const [currentUser, setCurrentUser] = useState<BaseAccount | null>(null)

    return (
        <>
            {step === 'email' && (
                <ResetPasswordEmailForm
                    onGoBack={onClose}
                    onSuccess={data => {
                        setCurrentUser(data || null)
                        setStep('otp')
                    }}
                />
            )}
            {step === 'otp' && (
                <ResetPasswordOTPForm
                    user={currentUser as BaseAccount}
                    onGoBack={() => setStep('email')}
                    onSuccess={() => setStep('password')}
                />
            )}
            {step === 'password' && (
                <ResetPasswordForm
                    user={currentUser as BaseAccount}
                    onGoBack={() => setStep('otp')}
                    onSuccess={() => {
                        Toast.success('Password reset successfully')
                        onClose()
                    }}
                />
            )}
        </>
    )
}

export default ResetPasswordManager
