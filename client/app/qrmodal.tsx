// modal.tsx
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Pressable, StyleSheet } from 'react-native';
import UserQRCodeModal from '@/components/UserQRCodeModal';
import { Link, useRouter } from 'expo-router';
const ModalScreen = () => {


    const [isModalVisible, setIsModalVisible] = useState(false)
    const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
    }

    const router = useRouter();
    // Toggle modal visibility
    const openModal = () => setIsModalVisible(true)
    const closeModal = () => setIsModalVisible(false)
  return (
    <View>
          <Pressable style={StyleSheet.absoluteFill} onPress={router.back} />


      <UserQRCodeModal userData={userData} closeModal={closeModal} />
      
      
      </View>
  );
};

export default ModalScreen;
