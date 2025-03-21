import { z } from 'zod'

export const CardSchema = z.object({
    id: z.string(),
    userId: z.string(),
    cardNumber: z.string().length(16),
    cardHolder: z.string().min(2),
    cardExpiration: z.string().length(5),
    cardBrand: z.enum(['mastercard', 'visa']),
    cvv: z.string().length(3),
    billingFullName: z.string().min(2),
    billingStreetAddress: z.string().min(2),
    billingProvince: z.string().min(2),
    billingCity: z.string().min(2),
    billingPostalCode: z.string().length(6),
})

export type TCardSchema = z.infer<typeof CardSchema>
