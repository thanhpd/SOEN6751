import { z } from 'zod'

export const CardSchema = z.object({
    id: z.string(),
    userId: z.string(),
    saveCard: z.boolean().optional(),
    cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    cardHolder: z.string().min(1, 'Card holder name is required'),
    cardExpiration: z
        .string()
        .length(5, 'Expiration date must be in MM/YY format')
        .regex(/^\d{2}\/\d{2}$/, 'Expiration date must be in MM/YY format')
        .refine(val => {
            // Extract month and year
            const [month, year] = val.split('/').map(Number)

            // Create date objects
            const currentDate = new Date()
            const currentYear = currentDate.getFullYear() % 100 // Get last 2 digits of year
            const currentMonth = currentDate.getMonth() + 1 // JS months are 0-indexed

            // Check if valid month
            if (month < 1 || month > 12) return false

            // Compare with current date
            return (
                year > currentYear ||
                (year === currentYear && month >= currentMonth)
            )
        }, 'Card expiration date must be current or future'),
    cardBrand: z.enum(['mastercard', 'visa']),
    cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
    billingFullName: z.string().min(1, 'Full name is required'),
    billingStreetAddress: z.string().min(1, 'Street address is required'),
    billingProvince: z
        .string({ required_error: 'Province is required' })
        .min(1, 'Province must be required'),
    billingCity: z.string().min(1, 'City must be required'),
    billingPostalCode: z.string().length(6, 'Postal code must be 6 digits'),
})

export type TCardSchema = z.infer<typeof CardSchema>
