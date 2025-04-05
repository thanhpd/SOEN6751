import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Modal,
    Button,
    ScrollView,
} from 'react-native'
import { Colors } from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { setCurrentOrder } from '@/store/currentOrder'
import { useAppDispatch } from '@/store'

const { width } = Dimensions.get('window') // Get screen width

const cards = [
    {
        id: '4',
        title: 'Weekly Membership',
        price: '$35/week',
        duration: 7, // 7 days
        bgColor: '#3498db',
        circleColor: '#2980b9',
    },
    {
        id: '3',
        title: 'Monthly Membership',
        price: '$50/month',
        duration: 30, // 30 days
        bgColor: '#27ae60',
        circleColor: '#1e8449',
    },
    {
        id: '2',
        title: 'Quarterly Membership',
        price: '$110/4 months',
        duration: 120, // 120 days
        bgColor: '#e67e22',
        circleColor: '#d35400',
    },
    {
        id: '1',
        title: 'Yearly Membership',
        price: '$275/year',
        duration: 365, // 365 days
        bgColor: '#c0392b',
        circleColor: '#922b21',
    },
]
export default function MmeberhipPage() {
    const { currentUser } = useAuth()
    const dispatch = useAppDispatch()

    const expiryDate = new Date(currentUser.expiryDate).toDateString()

    const getFutureDate = (days: number) => {
        const expiry = new Date(currentMembership.expiryDate)
        expiry.setDate(expiry.getDate() + days)
        return expiry.toDateString()
    }

    const userMembership = cards.find(
        card => card.id === currentUser.membershipTypeId.toString()
    )

    const [currentMembership, setCurrentMembership] = useState({
        title: userMembership?.title,
        expiryDate: expiryDate,
    })

    const [selectedMembership, setSelectedMembership] = useState<{
        title: string
        duration: number
        price: number
    } | null>(null)
    const [modalVisible, setModalVisible] = useState(false)

    const handlePress = (item: {
        title: string
        duration: number
        price: number
    }) => {
        setSelectedMembership(item)
        setModalVisible(true)
    }

    const confirmPurchase = () => {
        const customOrder = {
            id: '2',
            product: {
                id: '4',
                name: selectedMembership?.title,
                price: selectedMembership?.price,
                image: 'https://via.placeholder.com/150',
            },

            activity: {
                date: selectedMembership?.duration
                    ? getFutureDate(selectedMembership.duration)
                    : 'Invalid duration',
            },

            quantity: 1,
            total: selectedMembership?.price,
            taxes: 0.0,
            discount: 0.0,
        }

        dispatch(setCurrentOrder(customOrder))

        router.push('/order-review' as any)

        // if (selectedMembership) {
        //     setCurrentMembership({
        //         title: selectedMembership.title,
        //         expiryDate: selectedMembership.duration ? getFutureDate(selectedMembership.duration) : 'Invalid duration',
        //     });
        // }
        setModalVisible(false)
    }

    const renderItem = ({
        item,
    }: {
        item: {
            id: string
            title: string
            bgColor: string
            circleColor: string
            price: string
            duration: number
        }
    }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: item.bgColor }]}
            onPress={() =>
                handlePress({
                    title: item.title,
                    duration: item.duration,
                    price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
                })
            }
        >
            <Text style={styles.cardText}>{item.title}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>

            {/* Circular container with unique icon */}
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: item.circleColor },
                ]}
            >
                <Text style={styles.cardPrice}> Buy Membership</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
                {/* Confirmation Modal */}
                <Modal visible={modalVisible} transparent animationType="none">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Are you sure you want to buy the{' '}
                                {selectedMembership?.title}?
                            </Text>
                            <View style={styles.modalButtons}>
                                <Button
                                    title="Cancel"
                                    onPress={() => setModalVisible(false)}
                                    color="gray"
                                />
                                <Button
                                    title="Confirm"
                                    onPress={confirmPurchase}
                                    color={Colors.light.concordiaColor}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.title}>Current Plan</Text>

                <View style={styles.membership}>
                    <Text style={styles.cardText}>Weekly Membership</Text>
                    <Text style={styles.cardPrice}>
                        {' '}
                        Your Membership is valid until 15th May 2025
                    </Text>
                </View>
                <Text style={styles.title}>Membership Packages</Text>

                <FlatList
                    data={cards}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2} // Two columns
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false}
                />

                <Text style={styles.notice1}>
                    Tax will be added to listed prices
                </Text>

                <View style={styles.note}>
                    <Text style={styles.notice}>
                        Note: When you purchase a new membership, the remaining
                        duration of your current membership will automatically
                        be combined with the new membership. The new expiry date
                        will reflect the cumulative length of both memberships,
                        starting from the current date. Please review your new
                        membership details carefully before confirming. If you
                        have any questions or need assistance, feel free to
                        contact Le Gym's customer service.
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollview: {
        flexGrow: 1,
        padding: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    listContainer: {
        alignItems: 'center',
        flexGrow: 1,
        alignSelf: 'stretch',
        marginBottom: 0,
    },
    card: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: width / 2 - 40, // Each card takes half of the screen width minus margins
        position: 'relative', // Important for placing the icon container
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        borderRadius: 15, // Make the container circular
        padding: 5, // Add some padding to the icon
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    cardTextContainer: {
        borderRadius: 10,
        padding: 5,
    },

    cardPrice: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    },

    membership: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.light.concordiaColor,
        height: 110,
        width: width - 40, // Each card takes half of the screen width minus margins
        gap: 5,
    },

    notice: {
        color: 'black',
        fontSize: 13,
    },
    notice1: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'italic',
    },

    note: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
    },

    note1: {
        position: 'absolute',
        bottom: 240,
        alignContent: 'center',
        justifyContent: 'center',
    },

    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.light.concordiaColor,
    },
    modalButtons: { flexDirection: 'row', gap: 30, marginTop: 10 },
})
