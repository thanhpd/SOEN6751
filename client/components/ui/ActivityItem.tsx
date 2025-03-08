import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
} from 'react-native'
import { Activity } from '../../constants/types'

export const ActivityItem = ({ activity }: { activity: Activity }) => {
    return (
        <View style={{ flexDirection: 'row', padding: 10 }}>
            <Image
                source={require('../../assets/images/hero.png')}
                style={{ width: 100, height: 100 }}
            />

            <View
                style={{
                    flex: 1,
                    paddingLeft: 10,
                    justifyContent: 'space-between',
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        {activity.title}
                    </Text>
                    <Text style={{ color: 'black' }}>
                        {activity.instructor}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={require('../../assets/images/location_icon.png')}
                        style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: 'black', flex: 1 }}>
                        {activity.location}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'right',
                            backgroundColor: 'red',
                            borderRadius: 50,
                            padding: 5,
                        }}
                    >
                        {activity.price}
                    </Text>
                </View>
            </View>
        </View>
    )
}
