import React from "react";
import { View, Text } from "react-native";

interface LegendItemProps {
  color: string;
  label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => (
  <View className="flex-row items-center mb-2">
    <View className={`w-4 h-4 rounded ${color} mr-2`} />
    <Text className="text-gray-600 text-sm">{label}</Text>
  </View>
);

export const OccupancyLegend: React.FC = () => {
  return (
    <View className="mt-8">
      <LegendItem color="bg-green-200" label="Normal (0 - 50)" />
      <LegendItem color="bg-yellow-200" label="Moderate (50 - 150)" />
      <LegendItem color="bg-red-200" label="Crowded (150+)" />
    </View>
  );
};
