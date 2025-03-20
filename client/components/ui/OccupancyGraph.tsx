import React from "react";
import { View, Text } from "react-native";

const YAxisLabels = () => (
  <View className="w-12 justify-between items-end pr-2">
    <Text className="text-gray-600 text-sm">200+</Text>
    <Text className="text-gray-600 text-sm">150</Text>
    <Text className="text-gray-600 text-sm">100</Text>
    <Text className="text-gray-600 text-sm">50</Text>
    <Text className="text-gray-600 text-sm">00</Text>
  </View>
);

const XAxisLabels = () => (
  <View className="flex-row justify-between mt-2">
    {[
      "7 am",
      "9 am",
      "11 am",
      "1 pm",
      "3 pm",
      "5 pm",
      "7 pm",
      "8 pm",
      "9 pm",
      "10 pm",
    ].map((time) => (
      <Text key={time} className="text-gray-600 text-xs transform -rotate-45">
        {time}
      </Text>
    ))}
  </View>
);

const GraphBars = () => {
  const bars = [
    { height: 80, color: "bg-green-200" },
    { height: 120, color: "bg-yellow-200" },
    { height: 180, color: "bg-red-200" },
    { height: 140, color: "bg-yellow-200" },
    { height: 90, color: "bg-green-200" },
    { height: 160, color: "bg-red-200" },
    { height: 130, color: "bg-yellow-200" },
    { height: 70, color: "bg-green-200" },
    { height: 110, color: "bg-yellow-200" },
    { height: 60, color: "bg-green-200" },
  ];

  return (
    <View className="flex-row justify-between items-end h-40">
      {bars.map((bar, index) => (
        <View
          key={index}
          style={{ height: bar.height }}
          className={`w-6 rounded-t-md ${bar.color}`}
        />
      ))}
    </View>
  );
};

export const OccupancyGraph: React.FC = () => {
  return (
    <View className="mt-6">
      <View className="flex-row">
        <YAxisLabels />
        <View className="flex-1">
          <GraphBars />
          <XAxisLabels />
        </View>
      </View>
    </View>
  );
};
