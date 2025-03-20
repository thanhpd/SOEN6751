import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'

const ContactPage = () => {
    const [name, setName] = useState('Younes Nouri')
    const [email, setEmail] = useState('y_nouri@concordia.ca') // Pre-filled email
    const [message, setMessage] = useState('')

    const handleSend = () => {
        console.log('Message Sent:', { name, email, message })
        alert('Your message has been sent!')
        setName('')
        setMessage('')
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Contact Us</Text>

            {/* Name Input */}
            <TextInput
                style={[styles.input, styles.disabledInput]}
                
                
                value={name}
                onChangeText={setName}
            />

            {/* Email Input (Pre-filled) */}
            <TextInput
                style={[styles.input, styles.disabledInput]}
                value={email}
                editable={false} // Make it non-editable
            />

            {/* Message Box */}
            <TextInput
                style={[styles.input, styles.messageBox]}
                placeholder="Your Message"
                placeholderTextColor="#ABABAB"
                multiline
                numberOfLines={6}
                value={message}
                onChangeText={setMessage}
            />

            {/* Send Button */}
            <Pressable style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
            </Pressable>

            {/* Gym Contact Details */}
            <View style={styles.contactDetails}>
                <Text style={styles.contactTitle}>Location</Text>
                <Text style={styles.contactText}>🏢 LeGym, EV buiding Room EV-S2.206</Text>
                <Text style={styles.contactText}>📍 1515 Ste. Catherine St. W.</Text>
                <Text style={styles.contactTitle}>Contact Information</Text>
                <Text style={styles.contactText}>📞 514-848-2424, ext. 3860</Text>
                <Text style={styles.contactText}>✉️ legym@concordia.ca</Text>
            </View>
        </ScrollView>
    )
}

// Styles
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
        borderColor:Colors.light.fadedconcordiaColor,
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
