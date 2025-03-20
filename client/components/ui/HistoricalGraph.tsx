import React from "react";
import { View, Text } from "react-native";

const YAxisLabels = () => (
  <View className="w-12 justify-between items-end pr-2">
    <Text className="text-[#767676] font-bold text-sm">200+</Text>
    <Text className="text-[#767676] font-bold text-sm">150</Text>
    <Text className="text-[#767676] font-bold text-sm">100</Text>
    <Text className="text-[#767676] font-bold text-sm">50</Text>
    <Text className="text-[#767676] font-bold text-sm">00</Text>
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
      <Text key={time} className="text-[#767676] font-bold text-xs transform -rotate-45">
        {time}
      </Text>
    ))}
  </View>
);

const GraphBars = () => {
  const bars = [
    { height: 80, color: "bg-[#34C759]" },
    { height: 120, color: "bg-[#FF6600]" },
    { height: 180, color: "bg-[#D32C2F]" },
    { height: 140, color: "bg-[#FF6600]" },
    { height: 90, color: "bg-[#34C759]" },
    { height: 160, color: "bg-[#D32C2F]" },
    { height: 130, color: "bg-[#FF6600]" },
    { height: 70, color: "bg-[#34C759]" },
    { height: 110, color: "bg-[#FF6600]" },
    { height: 60, color: "bg-[#34C759]" },
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

export const HistoricalGraph: React.FC = () => {
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
