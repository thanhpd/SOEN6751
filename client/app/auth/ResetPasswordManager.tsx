import React, { useMemo, useState } from 'react'
import ResetPasswordEmailForm from './ResetPasswordEmailForm'
import ResetPasswordOTPForm from './ResetPasswordOTPForm'
import ResetPasswordForm from './ResetPasswordForm'

type TResetPasswordManagerStep = 'email' | 'otp' | 'password'

type TResetPasswordManagerProps = {
    onClose: () => void
}

const ResetPasswordManager = ({ onClose }: TResetPasswordManagerProps) => {
    const [step, setStep] = useState<TResetPasswordManagerStep>('email')

    const [currentEmail, setCurrentEmail] = useState<string | null>(null)

    const currentUser = useMemo(
        () => ({
            email: currentEmail || '',
            name: 'John Doe',
            avatarUrl: 'https://via.placeholder.com/150',
        }),
        [currentEmail]
    )

    return (
        <>
            {step === 'email' && (
                <ResetPasswordEmailForm
                    onGoBack={onClose}
                    onSuccess={form => {
                        setCurrentEmail(form.email)
                        setStep('otp')
                    }}
                />
            )}
            {step === 'otp' && (
                <ResetPasswordOTPForm
                    user={currentUser}
                    onGoBack={() => setStep('email')}
                    onSuccess={() => setStep('password')}
                />
            )}
            {step === 'password' && (
                <ResetPasswordForm
                    onGoBack={() => setStep('otp')}
                    onSuccess={() => {
                        // Display toast?
                        onClose()
                    }}
                />
            )}
        </>
    )
}

export default ResetPasswordManager
