import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, PanResponder, Animated } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface UserQRCodeModalProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  closeModal: () => void;
}

export default function UserQRCodeModal({ userData, closeModal }: UserQRCodeModalProps) {
  const [isVisible, setIsVisible] = useState(true); // Keep modal visible by default
  const modalPosition = useRef(new Animated.Value(400)).current; // Start off-screen position for modal
  const pan = useRef(new Animated.ValueXY()).current; // Reference for pan gesture

  useEffect(() => {
    // Animate modal sliding in when it becomes visible
    Animated.timing(modalPosition, {
      toValue: 0, // Slide it to the center
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to close the modal
  const closeModalHandler = () => {
    Animated.timing(modalPosition, {
      toValue: 400, // Slide it out
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false); // Once animation is complete, hide modal
      closeModal(); // Call parent component's closeModal to update visibility
    });
  };

  // PanResponder to handle drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Enable pan responder
      onMoveShouldSetPanResponder: () => true, // Continue responding to gestures
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down (dy >= 0)
        if (gestureState.dy > 0) {
          modalPosition.setValue(gestureState.dy); // Move the modal down based on drag
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // If the drag distance is large enough, close the modal
        if (gestureState.dy > 150) {
          closeModalHandler();
        } else {
          // Otherwise, reset the modal position back to the top
          Animated.spring(modalPosition, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeModalHandler} />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: modalPosition }],
              backgroundColor: '#fff',
            },
          ]}
          {...panResponder.panHandlers} // Attach pan handlers
        >
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>

          {/* QR Code */}
          <QRCode value={`${userData.name},${userData.email},${userData.phone}`} size={150} />

          
         
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
