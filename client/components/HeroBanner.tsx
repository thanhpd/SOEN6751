import React from 'react'
import { View, Text, Image } from 'react-native'

export default function HeroBanner() {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'magenta',
                height: 100,
                alignItems: 'center',
                borderRadius: 20,
                padding: 10,
                margin: 10,
            }}
        >
            <View style={{ flex: 1 }} />
            <Image
                source={require('../assets/images/hero.png')}
                style={{
                    width: 100,
                    height: 100,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            />
        </View>
    )
}
