import React from "react";
import { View, Text, Image } from "react-native";
import { Activity } from "@/constants/types";

export const ActivityCard: React.FC<Activity> = ({
  title,
  instructor,
  description,
  location,
  time,
  price,
}) => {
  return (
    <View className="flex-row bg-white rounded-lg shadow-md p-4 mb-4 mx-4">
      <View className="w-24 h-24 bg-gray-200 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900 mb-1">{title}</Text>
        <Text className="text-gray-600 mb-2">{instructor}</Text>
        <Text className="=text-gray-600">{description}</Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-600 mx-2">Mondays and Wednesdays</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-600">{location}</Text>
          <Text className="text-gray-600 mx-2">{time}</Text>
        </View>
        <Text className="text-purple-600 font-bold">{price}</Text>
      </View>
    </View>
  );
};
