import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native'
import HeroBanner from '@/components/HeroBanner'
import SearchBar from '@/components/SearchBar'
import { InPersonActivityList } from '@/components/ui/InPersonActivityList'
import { Colors } from '@/constants/Colors'
import { Button } from 'react-native-paper'

const { width } = Dimensions.get('window')

export default function OnlinePage() {
    return (
        <View style={styles.container}>
            <HeroBanner
                title="Nutrition Consultancy Spring 2025"
                description="Keep track of your macros."
                date="From April 10 to June 30"
                image={require('../assets/images/nutrition.jpg')}
            />

            <Text style={styles.title}>Dietitian Jessy Cheung</Text>

            <View style={styles.card}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.quote}>
                        "Assess where you are in your nutrition journey and
                        discover how we can work together to build sustainable
                        habits that help you reach your goals."
                    </Text>
                    <Text style={styles.cardText}>
                        Tues. and Thurs. - 4-7 p.m
                    </Text>
                    <Text style={styles.cardText}>Saturdays - 9-11 a.m</Text>
                    <Text style={styles.cardText}>Each Session $90</Text>
                    <View style={styles.button}>
                        <Text style={styles.cardText2}>Register Now</Text>
                    </View>
                </View>

                <View style={styles.imageSection}>
                    <Image
                        style={styles.tipimage}
                        source={require('../assets/images/jessy.png')}
                    ></Image>
                </View>
            </View>

            <Text style={styles.title}>Diet Tips</Text>

            <View style={styles.tipsContainer}>
                <View style={styles.tips}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/tip.png')}
                    ></Image>
                    <Text style={styles.tipText}>
                        Switch up your morning routine with this simple combo
                        you can prepare the night before Greek or plain yogurt,
                        fruit and muesli. A combo that's easy to pack, delivers
                        on texture and is nutritious..
                    </Text>
                </View>

                <View style={styles.tips}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/tip2.png')}
                    ></Image>
                    <Text style={styles.tipText}>
                        Research suggests that eating patterns similar to
                        the Mediterranean diet (rich in fruits, vegetables, nuts
                        and whole-grains and low in red meat and processed
                        food) can support a positive mood.
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    card: {
        flexDirection: 'row',
        marginLeft: 20,

        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
        marginBottom: 20,
    },
    cardText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },

    cardText2: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },
    image: {
        width: 150,
        height: 150,
    },

    tipimage: {
        width: 120,
        height: 150,
    },

    cardTextContainer: {
        flexDirection: 'column',

        alignItems: 'flex-start',
        flex: 1,
    },

    button: {
        borderRadius: 20,
        backgroundColor: Colors.light.concordiaColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 100,

        marginTop: 20,

        marginLeft: 40,
    },

    imageSection: {
        flexDirection: 'column',
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 25,
        marginBottom: 10,
    },

    quote: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 10,
    },

    tips: {
        flexDirection: 'column',
        alignItems: 'flex-start',

        marginRight: 10,
        flex: 1,
    },

    tipsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 30,

        gap: 10,
    },

    tipText: {
        fontSize: 10,
    },
})
