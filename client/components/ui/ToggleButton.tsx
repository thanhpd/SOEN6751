import React, { useState, useEffect, useRef } from 'react'
import { View, Pressable, StyleSheet, Animated } from 'react-native'

interface ToggleButtonProps {
    initialState?: boolean
    onToggle?: (value: boolean) => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    initialState = false,
    onToggle,
}) => {
    const [isEnabled, setIsEnabled] = useState(initialState)
    const animatedValue = useRef(
        new Animated.Value(initialState ? 1 : 0)
    ).current

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isEnabled ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [isEnabled])

    const toggle = () => {
        const newValue = !isEnabled
        setIsEnabled(newValue)
        onToggle?.(newValue)
    }

    const toggleCirclePosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 26], // Adjust these values based on the width of the toggle container and circle
    })

    return (
        <Pressable onPress={toggle}>
            <View
                style={[
                    styles.toggleContainer,
                    isEnabled ? styles.enabled : styles.disabled,
                ]}
            >
                <Animated.View
                    style={[
                        styles.toggleCircle,
                        {
                            transform: [{ translateX: toggleCirclePosition }],
                        },
                    ]}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    toggleContainer: {
        width: 48,
        height: 24,
        borderRadius: 12,
        position: 'relative',
    },
    enabled: {
        backgroundColor: '#98243C',
    },
    disabled: {
        backgroundColor: 'lightgray',
    },
    toggleCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        top: 2,
    },
})

export default ToggleButton
