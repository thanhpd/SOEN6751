import { View, Text, Button } from 'react-native'
import { Pressable, TouchableOpacity } from 'react-native-gesture-handler'

type QtySelectorProps = {
    qty: number
    onIncrease: () => void
    onDecrease: () => void
}

export const QtySelector = ({
    qty,
    onIncrease,
    onDecrease,
}: QtySelectorProps) => {
    return (
        <View className="flex flex-row items-center justify-between rounded-lg h-[40px] w-[120px] bg-[#CECECF]">
            <Pressable
                className="flex flex-1 items-center justify-center bg-[#CECECF] w-10 h-10 rounded-lg"
                onPress={onDecrease}
            >
                <Text className="text-lg font-bold w-10 flex items-center justify-center text-center">
                    -
                </Text>
            </Pressable>
            <View className="flex flex-1 items-center justify-center bg-[#CECECF] w-10 h-8 border border-black/50 border-t-0 border-b-0">
                <Text className="text-lg font-bold">{qty}</Text>
            </View>
            <Pressable
                className="flex flex-1 items-center justify-center bg-[#CECECF] w-10 h-10 rounded-lg"
                onPress={onIncrease}
            >
                <Text className="text-lg font-bold w-10 flex items-center justify-center text-center">
                    +
                </Text>
            </Pressable>
        </View>
    )
}
