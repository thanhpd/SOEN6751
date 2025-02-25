import React from "react";
import { View } from "react-native";

interface DotsIndicatorProps {
  totalDots: number;
  activeDot: number;
}

export const DotsIndicator: React.FC<DotsIndicatorProps> = ({
    totalDots,
    activeDot,
}) => {
    return (
        <View style={{ flexDirection: "row", marginVertical: 24 }}>
            {[...Array(totalDots)].map((_, index) => (
                <View
                    key={index}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: index === activeDot ? "#1B0101" : "#F0ECE6",
                        marginHorizontal: 10,
                    }}
                />
            ))}
        </View>
    );
};
