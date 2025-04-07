import React from 'react'
import { View, Image, Text } from 'react-native'
import { Card } from 'react-native-paper'
import { Colors } from '@/constants/Colors'

interface HeroBannerProps {
    title: string
    description: string
    date: string
    image: any // Image source
}

export default function HeroBanner({
    title,
    description,
    date,
    image,
}: HeroBannerProps) {
    return (
        <View style={{ padding: 16, marginHorizontal: 10, marginBottom: 0 }}>
            <Card style={{ borderRadius: 12, overflow: 'hidden' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderRadius: 12,
                        backgroundColor: Colors.concordia.background,
                        alignItems: 'center',
                    }}
                >
                    {/* Text Section */}
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}
                        >
                            {title}
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 10,
                                marginTop: 4,
                            }}
                        >
                            {description}
                        </Text>
                        <View style={{ height: 8 }} />
                        <Text style={{ color: 'white', fontSize: 12 }}>
                            {date}
                        </Text>
                    </View>

                    {/* Image Section with Overlay */}
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={image}
                            style={{
                                width: 140,
                                height: 120,
                                resizeMode: 'cover',
                                borderRadius: 8, // Match card shape if needed
                            }}
                        />
                        {/* Overlay */}
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(192, 57, 43, 0.4)', // Semi-transparent red
                                borderRadius: 8, // Match image border radius
                            }}
                        />
                    </View>
                </View>
            </Card>
        </View>
    )
}
