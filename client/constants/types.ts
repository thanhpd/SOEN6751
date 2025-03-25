export interface Activity {
    title: string
    instructor: string
    description: string
    location: string
    price: number
    time: string
    days: string
    image?: string
    type?: string
    category?: string
}

export interface Category {
    name: string
    isActive?: boolean
}

export interface CalendarEvent {
    id: string
    date: string
    activity: Activity
    user_id: string
    // bookedActivities: Activity[];
}

export interface Notification {
    id: number
    title: string
    dateTime: Date
    body: string
}

export interface Membership {
    id: string
    membershipTypeId: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    studentId: string
    expiryDate: string
}

export interface Account {
    id: string
    membershipId: string
    email: string
    password: string
    avatar: string
    qrCode: string
    notificationToggle: boolean
    gamificationToggle: boolean
    gamificationProgress: number
}

export interface BaseAccount {
    id: string
    email: string
    name: string
    avatar: string
}

export type CurrentUser = BaseAccount & Omit<Membership, 'password'>
