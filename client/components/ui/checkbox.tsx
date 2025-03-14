import * as CheckboxPrimitive from '@rn-primitives/checkbox'
import * as React from 'react'
import { Platform, View } from 'react-native'
import { Check } from '@/lib/icons/Check'
import { cn } from '@/lib/utils'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Label } from '@/components/ui/label'

interface ControlledCheckboxProps<T extends FieldValues>
    extends Omit<
        React.PropsWithChildren<CheckboxPrimitive.RootProps>,
        'checked' | 'onCheckedChange'
    > {
    name: Path<T>
    control: Control<T>
}

const Checkbox = React.forwardRef<
    CheckboxPrimitive.RootRef,
    CheckboxPrimitive.RootProps
>(({ className, ...props }, ref) => {
    return (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'web:peer h-4 w-4 native:h-[20] native:w-[20] shrink-0 rounded-sm native:rounded border border-[#9EA1AE] disabled:cursor-not-allowed disabled:opacity-50',
                props.checked && 'bg-red border-none native:border-none',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('items-center justify-center h-full w-full')}
            >
                <Check
                    size={12}
                    strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
                    className="text-primary-foreground"
                />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export function ControlledCheckbox<T extends FieldValues>(
    props: ControlledCheckboxProps<T>
) {
    const id = React.useId()
    const { name, control, children, ...checkboxProps } = props
    const { field } = useController({ name, control })

    return (
        <View className="flex flex-row items-center gap-2">
            <Checkbox
                {...checkboxProps}
                ref={field.ref}
                checked={(field.value as boolean) || false}
                onCheckedChange={field.onChange}
                aria-labelledby={id}
            />
            <Label nativeID={id} onPress={() => field.onChange(!field.value)}>
                {children}
            </Label>
        </View>
    )
}

export { Checkbox }
