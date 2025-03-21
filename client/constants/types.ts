export interface Activity {
    title: string
    instructor: string
    description: string
    location: string
    price: string
    time: string
    days: string
    image?: string
    inPerson?: boolean
}

export interface Category {
    name: string
    isActive?: boolean
}

export interface CalendarEvent {
    id: string
    title: string
    date: string // Date of the event, can be adjusted based on your needs
    selected: boolean
    selectedColor: string
    activity?: Activity
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
    password: string
    avatar: string
    qrCode: string
    notificationToggle: boolean
    gamificationToggle: boolean
    gamificationProgress: number
}
