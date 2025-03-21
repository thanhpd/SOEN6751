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
    quantity: number
    total: number
    discount: number
    taxes: number
    paymentMethod?: TCardSchema
}
