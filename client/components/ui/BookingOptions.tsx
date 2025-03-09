import * as React from 'react'
import { Card, Button } from 'react-native-paper'
import { View } from 'react-native'
import { Colors } from '@/constants/Colors'
const BookingOptions = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                padding: 5,
            }}
        >
            <Button
                mode="contained"
                style={{ backgroundColor: Colors.boxPink.backgroundColor }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] mb-2.5 py-2.5"
            >
                In - Person Activities
            </Button>
            <Button
                mode="contained"
                style={{ backgroundColor: Colors.boxYellow.backgroundColor }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] mb-2.5 py-2.5"
            >
                Online Activities
            </Button>
            <Button
                mode="contained"
                style={{ backgroundColor: Colors.boxGray.backgroundColor }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] mb-2.5 py-2.5"
            >
                Personal Training
            </Button>
            <Button
                mode="contained"
                style={{ backgroundColor: Colors.boxPurple.backgroundColor }}
                labelStyle={{
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
                className="w-[48%] mb-2.5 py-2.5"
            >
                Nutrition Consultancy
            </Button>
        </View>
    )
}

export default BookingOptions
