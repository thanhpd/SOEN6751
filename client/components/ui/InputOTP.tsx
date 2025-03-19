import { View, Text, Alert } from 'react-native'
import { OTPInput, type SlotProps } from 'input-otp-native'
import type { OTPInputRef } from 'input-otp-native'
import { useRef } from 'react'

import Animated, {
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    useSharedValue,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { cn } from '@/lib'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import clsx from 'clsx'

export type InputControllerType<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
}

type TSlotProps = SlotProps & { hasFakeCaret: boolean; className?: string }

export function InputOTP() {
    const ref = useRef<OTPInputRef>(null)
    const onComplete = (code: string) => {
        Alert.alert('Completed with code:', code)
        ref.current?.clear()
    }

    return (
        <OTPInput
            ref={ref}
            onComplete={onComplete}
            maxLength={6}
            render={({ slots }) => (
                <View className="flex-row gap-2 items-center justify-center">
                    {slots.map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                    ))}
                </View>
            )}
        />
    )
}

export function ControlledInputOTP<T extends FieldValues>({
    name,
    control,
}: InputControllerType<T>) {
    const { field, fieldState } = useController({
        name,
        control,
    })
    return (
        <View>
            <OTPInput
                ref={field.ref}
                onComplete={field.onChange}
                maxLength={6}
                render={({ slots }) => (
                    <View className="flex-row gap-2 items-center justify-center">
                        {slots.map((slot, idx) => (
                            <Slot
                                key={idx}
                                {...slot}
                                className={clsx(
                                    fieldState.error && 'border-red-600'
                                )}
                            />
                        ))}
                    </View>
                )}
            />
            {fieldState.error?.message && (
                <Text className="text-center text-xs text-red-600 mt-1 font-default-400">
                    {fieldState.error.message}
                </Text>
            )}
        </View>
    )
}

function Slot({ char, isActive, hasFakeCaret, className }: TSlotProps) {
    return (
        <View
            className={cn(
                'w-[46px] h-[52px] items-center justify-center border border-[rgba(152,36,60,0.29)] rounded-2xl bg-white',
                {
                    'border-red': isActive,
                },
                className
            )}
        >
            {char !== null && (
                <Text className="font-medium text-[#090D20]">{char}</Text>
            )}
            {hasFakeCaret && <FakeCaret />}
        </View>
    )
}

function FakeCaret() {
    const opacity = useSharedValue(1)

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0, { duration: 500 }),
                withTiming(1, { duration: 500 })
            ),
            -1,
            true
        )
    }, [opacity])

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    const baseStyle = {
        width: 2,
        height: 28,
        backgroundColor: '#000',
        borderRadius: 1,
    }

    return (
        <View className="absolute w-full h-full items-center justify-center">
            <Animated.View style={[baseStyle, animatedStyle]} />
        </View>
    )
}
