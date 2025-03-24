import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
    stayLoggedIn: z.boolean().optional(),
})

export const RegisterSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(2),
        confirmPassword: z.string().min(2),
        acceptedTerms: z.boolean(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })
    .refine(data => data.acceptedTerms, {
        message: 'You must accept the terms and conditions',
        path: ['acceptedTerms'],
    })

export const UserDetailsSchema = z
    .object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        avatar: z.string().optional(),
        newPassword: z.string().min(2).optional(),
        confirmPassword: z.string().min(2).optional(),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type TUserDetailsSchema = z.infer<typeof UserDetailsSchema>
export type TLoginSchema = z.infer<typeof LoginSchema>
export type TRegisterSchema = z.infer<typeof RegisterSchema>
