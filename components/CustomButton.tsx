import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#1B0101] py-3 px-20 rounded-[7px] mt-8 h-11 w-80"
      activeOpacity={0.8}
    >
      <Text className="text-[#E4AEAE] font-normal text-base text-center font-['Poppins']">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
