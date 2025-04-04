import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";

const QRCodeScreen: React.FC = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>User not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan Your QR Code</Text>

            <View style={styles.Qrcontainer}>
                {/* Profile Picture Circle */}
                <View style={styles.profileCircle}>
                    <Image
                        source={{ uri: currentUser.avatar || 'https://via.placeholder.com/100' }} // Replace with actual image source or fallback
                        style={styles.profileImage}
                    />
                </View>

                <View style={{ marginTop: 40, alignItems: "center" }}>
                    <Text style={styles.detail}>
                        {currentUser.firstName} {currentUser.lastName}
                    </Text>
                    <Text style={styles.detail2}>{currentUser.email}</Text>
                    <Text style={styles.detail2}>{currentUser.studentId}</Text>
                </View>

                <View style={styles.qrBox}>
                    <QRCode
                        value={`${currentUser.firstName},${currentUser.lastName},${currentUser.email},${currentUser.studentId}`}
                        size={230}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: "center",
    },
    Qrcontainer: {
        backgroundColor: Colors.light.concordiaColor,
        width: "85%",
        height: "65%",
        alignItems: "center",
        borderRadius: 20,
        position: "relative", // Required for absolute children
         // Give space for the profile circle
    },
    profileCircle: {
        position: "absolute",
        top: -50,
        alignSelf: "center",
        width: 100,
        height: 100,
        borderRadius: 55,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: Colors.light.concordiaColor,
        zIndex: 10,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 70,
        color: "black",
    },
    detail: {
        fontSize: 20,
        marginBottom: 5,
        marginTop: 15,
        fontWeight: "bold",
        color: "white",
    },
    detail2: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold",
        color: "white",
    },
    qrBox: {
        marginTop: 20,
        backgroundColor: "white",
        padding: 25,
        borderRadius: 20,
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
});

export default QRCodeScreen;
