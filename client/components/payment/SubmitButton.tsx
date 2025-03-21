import { TCardSchema } from '@/components/payment/schema'
import { Button } from '@/components/primitives/button'
import React from 'react'
import { Control, useWatch } from 'react-hook-form'
import { Text } from 'react-native'

type SubmitButtonProps = {
    mode: 'order' | 'management'
    onSubmit: () => void
    control: Control<TCardSchema>
}

const SubmitButton = ({ mode, onSubmit, control }: SubmitButtonProps) => {
    const id = useWatch<TCardSchema>({
        control,
        name: 'id',
    })

    return (
        <Button
            size="lg"
            className="bg-red rounded-[28px] w-full"
            onPress={onSubmit}
        >
            <Text className="text-white text-base font-bold">
                {mode === 'management' && (
                    <>{id === '-1' ? 'Add Card' : 'Update'}</>
                )}
                {mode === 'order' && <>Pay</>}
            </Text>
        </Button>
    )
}

export default SubmitButton
