import { Linking } from 'react-native'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function openLinkInBrowser(url: string) {
    Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url))
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
