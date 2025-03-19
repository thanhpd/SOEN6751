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
}

export type TPaymentCard = {
    id: string
    last4Digits: string
    cardHolder: string
    cardExpiration: string
    cardBrand: 'mastercard' | 'visa'
}
