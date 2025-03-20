import React, { useState } from "react";
import { View, Text } from "react-native";
import { OccupancyTabs } from "@/components/ui/OccupancyTabs";
import { OccupancyGraph } from "@/components/ui/OccupancyGraph";
import { OccupancyLegend } from "@/components/ui/OccupancyLegend";

export const GymOccupancy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"realtime" | "historical">(
    "realtime",
  );

  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-2xl font-bold mb-4">Gym Occupancy</Text>

      <OccupancyTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <View className="mt-6">
        <OccupancyGraph />
        <OccupancyLegend />
      </View>
    </View>
  );
};

export default GymOccupancy;
