import React from "react";
import { View, Text, Image } from "react-native";

export const HeroBanner: React.FC = () => {
  return (
    <View className="bg-purple-100 p-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <View className="flex-row items-center space-x-2 mb-2">
            <Text className="text-xl font-bold text-purple-900">
              In - Person Activities
            </Text>
            <Text className="text-xl font-bold text-purple-900">
              Winter 2025
            </Text>
          </View>
          <Text className="text-base text-purple-700 mb-1">
            Get inspired and moving at the same time.
          </Text>
          <Text className="text-sm text-purple-600">
            From Jan. 13 to April 6
          </Text>
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d45631aba0c14a4bebffcebb3f770f810d6e31cd",
          }}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
