import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface OccupancyTabsProps {
  activeTab: "realtime" | "historical";
  onTabChange: (tab: "realtime" | "historical") => void;
}

export const OccupancyTabs: React.FC<OccupancyTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View className="flex-row bg-gray-100 rounded-lg p-1">
      <TouchableOpacity
        onPress={() => onTabChange("realtime")}
        className={`flex-1 py-2 px-4 rounded-md ${
          activeTab === "realtime" ? "bg-white shadow" : ""
        }`}
      >
        <Text
          className={`text-center ${
            activeTab === "realtime"
              ? "text-blue-600 font-medium"
              : "text-gray-600"
          }`}
        >
          Real Time Stats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabChange("historical")}
        className={`flex-1 py-2 px-4 rounded-md ${
          activeTab === "historical" ? "bg-white shadow" : ""
        }`}
      >
        <Text
          className={`text-center ${
            activeTab === "historical"
              ? "text-blue-600 font-medium"
              : "text-gray-600"
          }`}
        >
          Historical Stats
        </Text>
      </TouchableOpacity>
    </View>
  );
};
