import { TCardSchema } from '@/components/payment/schema'

export type TProduct = {
    id: string
    name: string
    price: number
    image: string
    
}

export type TOrder = {
    id: string
    product: TProduct
    activity: TActivity
    quantity: number
    total: number
    discount: number
    taxes: number
    paymentMethod?: TCardSchema
}

export type TActivity ={
    date: string
    time: string
    type : string
    color: string
    Instructor: string
    location : string
    description : string


}
