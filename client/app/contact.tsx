import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import ToastManager from 'toastify-react-native'
import { useAuth } from '@/hooks/useAuth'

const ContactPage = () => {
    const { currentUser } = useAuth()

    const [name, setName] = useState(
        currentUser.firstName + ' ' + currentUser.lastName
    )
    const [email] = useState(currentUser.email) // Pre-filled
    const [message, setMessage] = useState('')

    const handleSend = () => {
        console.log('Message Sent:', { name, email, message })

        ToastManager.success('sent successfully!')

        setMessage('')
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Contact Us</Text>

            <TextInput
                style={[styles.input, styles.disabledInput]}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, styles.disabledInput]}
                value={email}
                editable={false}
            />

            <TextInput
                style={[styles.input, styles.messageBox]}
                placeholder="Your Message"
                placeholderTextColor="#ABABAB"
                multiline
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
            />

            <Pressable
                style={[
                    styles.sendButton,
                    { opacity: message.trim() ? 1 : 0.5 },
                ]}
                onPress={handleSend}
                disabled={!message.trim()}
            >
                <Text style={styles.sendButtonText}>Send</Text>
            </Pressable>

            <View style={styles.contactDetails}>
                <Text style={styles.contactTitle}>Location</Text>
                <Text style={styles.contactText}>
                    🏢 LeGym, EV building Room EV-S2.206
                </Text>
                <Text style={styles.contactText}>
                    📍 1515 Ste. Catherine St. W.
                </Text>
                <Text style={styles.contactTitle}>Contact Information</Text>
                <Text style={styles.contactText}>
                    📞 514-848-2424, ext. 3860
                </Text>
                <Text style={styles.contactText}>✉️ legym@concordia.ca</Text>
            </View>
        </ScrollView>
    )
}

const styles = {
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#98243C',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: Colors.light.fadedconcordiaColor,
    },
    disabledInput: {
        backgroundColor: '#EAEAEA',
        color: '#777',
    },
    messageBox: {
        height: 120,
        textAlignVertical: 'top',
    },
    sendButton: {
        backgroundColor: '#98243C',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    contactDetails: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#98243C',
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
}

export default ContactPage
