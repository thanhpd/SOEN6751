import React from "react";
import { View, Text, Image } from "react-native";
import { Activity } from "@/constants/types";

export const ActivityList: React.FC<Activity> = ({
  title,
  instructor,
  location,
  price,
}) => {
  return (
    <View className="flex-row bg-white rounded-lg shadow-md p-4 mb-4 mx-4">
      <View className="w-24 h-24 bg-gray-200 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
        <Text className="text-gray-600 mb-2">{instructor}</Text>
        <View className="flex-row items-center mb-2">
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b196eb4942c7c9fcbac50983e2eda8fd7e4403f",
            }}
            className="w-4 h-4 mr-2"
            resizeMode="contain"
          />
          <Text className="text-gray-600">{location}</Text>
        </View>
        <Text className="text-purple-600 font-bold">{price}</Text>
      </View>
    </View>
  );
};
