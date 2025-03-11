import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getItem<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key)
    return value ? JSON.parse(value) || null : null
}

export async function setItem<T>(key: string, value: T) {
    AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function removeItem(key: string) {
    AsyncStorage.removeItem(key)
}
