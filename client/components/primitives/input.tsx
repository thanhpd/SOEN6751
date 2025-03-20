import * as React from 'react'
import type {
    Control,
    FieldValues,
    Path,
    RegisterOptions,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { TextInputProps } from 'react-native'
import {
    Button,
    I18nManager,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { TextInput as NTextInput } from 'react-native'
import { tv } from 'tailwind-variants'
import { Text } from './text'
import { EyeIcon } from '@/components/icons/EyeIcon'
import clsx from 'clsx'
import { cn } from '@/lib'
import { EyeOffIcon } from '@/components/icons/EyeOffIcon'

const inputTv = tv({
    slots: {
        container: 'mb-2',
        label: 'text-sm text-red leading-[1.3] font-bold mb-2',
        input: 'rounded-[28px] border-[1.5px] border-solid border-[rgba(152,36,60,0.29)] bg-white p-4 w-full text-sm text-[#262D33] leading-[1.6] font-default-400 h-[54px]',
    },

    variants: {
        focused: {
            true: {
                input: 'border-red bg-[#F3F4F9]',
            },
        },
        error: {
            true: {
                input: 'border-red-600',
                label: 'text-red-600',
            },
        },
        disabled: {
            true: {
                input: 'bg-neutral-200',
            },
        },
        readOnly: {
            true: {
                input: 'text-[#9EA1AE] bg-[rgba(228,228,228,0.60)]',
            },
        },
    },
    defaultVariants: {
        focused: false,
        error: false,
        disabled: false,
    },
})

export interface NInputProps extends TextInputProps {
    label?: string
    disabled?: boolean
    error?: string
    showPasswordToggle?: boolean
}

type TRule<T extends FieldValues> =
    | Omit<
          RegisterOptions<T>,
          'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> }
export type InputControllerType<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
    rules?: RuleType<T>
}

interface ControlledInputProps<T extends FieldValues>
    extends NInputProps,
        InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
    const { label, error, testID, ...inputProps } = props
    const [isFocussed, setIsFocussed] = React.useState(false)
    const onBlur = React.useCallback(() => setIsFocussed(false), [])
    const onFocus = React.useCallback(() => setIsFocussed(true), [])

    const [showPassword, setShowPassword] = React.useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const styles = React.useMemo(
        () =>
            inputTv({
                error: Boolean(error),
                focused: isFocussed,
                disabled: Boolean(props.disabled),
                readOnly: Boolean(props.readOnly),
            }),
        [error, isFocussed, props.disabled]
    )

    return (
        <View className={styles.container()}>
            {label && (
                <Text
                    testID={testID ? `${testID}-label` : undefined}
                    className={styles.label()}
                >
                    {label}
                </Text>
            )}
            {inputProps.secureTextEntry ? (
                <View
                    className={cn(
                        styles.input(),
                        'flex flex-row items-center space-between px-0 py-0 gap-0'
                    )}
                >
                    <NTextInput
                        testID={testID}
                        ref={ref}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        {...inputProps}
                        className={clsx(
                            inputProps.className,
                            'h-full flex-1 font-default-400 pl-4 text-sm text-[#262D33] leading-[1.6] font-default-400'
                        )}
                        style={StyleSheet.flatten([
                            {
                                writingDirection: I18nManager.isRTL
                                    ? 'rtl'
                                    : 'ltr',
                            },
                            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
                            inputProps.style,
                        ])}
                        secureTextEntry={
                            inputProps.secureTextEntry && !showPassword
                        }
                    />
                    <TouchableOpacity
                        className="ml-5 p-3 mr-1 flex-shrink-0"
                        onPress={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </TouchableOpacity>
                </View>
            ) : (
                <NTextInput
                    testID={testID}
                    ref={ref}
                    className={styles.input()}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    {...inputProps}
                    style={StyleSheet.flatten([
                        { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
                        { textAlign: I18nManager.isRTL ? 'right' : 'left' },
                        inputProps.style,
                    ])}
                />
            )}
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
})

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
    props: ControlledInputProps<T>
) {
    const { name, control, rules, children, ...inputProps } = props

    const { field, fieldState } = useController({ control, name, rules })
    return (
        <Input
            ref={field.ref}
            autoCapitalize="none"
            onChangeText={field.onChange}
            value={(field.value as string) || ''}
            {...inputProps}
            error={fieldState.error?.message}
        />
    )
}
