import * as React from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { View, StyleSheet, I18nManager } from 'react-native'
import { tv } from 'tailwind-variants'
import { Picker as RNPicker } from '@react-native-picker/picker'
import { Text } from '../primitives/text'

const pickerTv = tv({
    slots: {
        container: 'mb-2',
        label: 'text-sm text-red leading-[1.3] font-bold mb-2',
        pickerContainer:
            'rounded-[28px] border-[1.5px] border-solid border-[rgba(152,36,60,0.29)] bg-white overflow-hidden text-sm',
        picker: 'w-full text-sm text-[#262D33] leading-[1.6] font-default-400',
    },

    variants: {
        focused: {
            true: {
                pickerContainer: 'border-red bg-[#F3F4F9]',
            },
        },
        error: {
            true: {
                pickerContainer: 'border-red-600',
                label: 'text-red-600',
            },
        },
        disabled: {
            true: {
                pickerContainer: 'bg-neutral-200',
            },
        },
    },
    defaultVariants: {
        focused: false,
        error: false,
        disabled: false,
    },
})

export interface PickerProps {
    label?: string
    value?: string
    onValueChange?: (value: string) => void
    disabled?: boolean
    error?: string
    options: Array<{ label: string; value: string }>
    testID?: string
    isRequired?: boolean
}

export const Picker = React.forwardRef<RNPicker<any>, PickerProps>(
    (props, ref) => {
        const {
            label,
            error,
            testID,
            isRequired = true,
            value,
            onValueChange,
            options,
            disabled,
        } = props

        const [isFocussed, setIsFocussed] = React.useState(false)

        const styles = React.useMemo(
            () =>
                pickerTv({
                    error: Boolean(error),
                    focused: isFocussed,
                    disabled: Boolean(disabled),
                }),
            [error, isFocussed, disabled]
        )

        return (
            <View className={styles.container()}>
                {label && (
                    <Text
                        testID={testID ? `${testID}-label` : undefined}
                        className={styles.label()}
                    >
                        {label}
                        {isRequired && (
                            <Text className="text-red-600 font-default-400 text-sm">
                                {' *'}
                            </Text>
                        )}
                    </Text>
                )}
                <View className={styles.pickerContainer()}>
                    <RNPicker
                        ref={ref as any}
                        selectedValue={value}
                        onValueChange={onValueChange}
                        enabled={!disabled}
                        prompt="Select an option"
                        style={StyleSheet.flatten([
                            {
                                height: 48,
                                fontSize: 14,
                                color: value ? '#262D33' : 'rgb(110,119,129)',
                                marginBottom: 5,
                            },
                            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
                        ])}
                    >
                        {options.map(option => (
                            <RNPicker.Item
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                style={{ fontSize: 14 }}
                            />
                        ))}
                    </RNPicker>
                </View>
                {error && (
                    <Text
                        testID={testID ? `${testID}-error` : undefined}
                        className="text-xs text-red-600 mt-1 font-default-400"
                    >
                        {error}
                    </Text>
                )}
            </View>
        )
    }
)

// React Hook Form integration
export function ControlledPicker<T extends FieldValues>({
    name,
    control,
    options,
    ...pickerProps
}: {
    name: Path<T>
    control: Control<T>
    options: Array<{ label: string; value: string }>
} & Omit<PickerProps, 'value' | 'onValueChange' | 'options'>) {
    const { field, fieldState } = useController({ control, name })

    return (
        <Picker
            value={field.value}
            onValueChange={field.onChange}
            options={options}
            {...pickerProps}
            error={fieldState.error?.message}
        />
    )
}
