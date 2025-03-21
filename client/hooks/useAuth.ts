import {
    TLoginSchema,
    TRegisterSchema,
    TUserDetailsSchema,
} from '@/app/auth/schema'
import { Account } from '@/constants/types'
import { useAppSelector, useAppDispatch } from '@/store'
import { addDBAccount, updateDBAccount } from '@/store/accountDB'
import { useCallback, useMemo } from 'react'
import uuid from 'react-native-uuid'

export function useAuth() {
    const dispatch = useAppDispatch()
    const currentUserId = useAppSelector(state => state.currentUserId)
    const accountDB = useAppSelector(state => state.accountDB)
    const membershipDB = useAppSelector(state => state.membershipDB)

    console.log({ accountDB, membershipDB, currentUserId })

    const authenticate = useCallback(
        (data: TLoginSchema) => {
            const account = Object.values(accountDB.entities).find(
                acc =>
                    acc.email === data.email && acc.password === data.password
            )

            if (!account) {
                return {
                    field: 'email',
                    message: 'Invalid email or password',
                }
            }

            if (account) {
                const { id, ...membership } =
                    membershipDB.entities[account.membershipId]
                return { success: true, user: { ...account, ...membership } }
            }

            return { success: false, user: null }
        },
        [accountDB]
    )

    const register = useCallback(
        (data: TRegisterSchema) => {
            const membership = Object.values(membershipDB.entities).find(
                m => m.email === data.email
            )

            if (!membership) {
                return {
                    field: 'email',
                    message:
                        'E-mail address not found. Make sure to use the same email address you used to create your membership with us.',
                }
            }

            const account = Object.values(accountDB.entities).find(
                acc => acc.email === data.email
            )

            if (!account) {
                const newAccount: Account = {
                    id: uuid.v4(),
                    membershipId: membership.id,
                    email: data.email,
                    password: data.password,
                    avatar: '',
                    qrCode: '',
                    notificationToggle: true,
                    gamificationToggle: true,
                    gamificationProgress: 0,
                }

                dispatch(addDBAccount(newAccount))
                return { account: newAccount }
            }

            return {
                field: 'email',
                message: 'An account with this e-mail address already exists.',
            }
        },
        [accountDB, membershipDB]
    )

    const currentUser = useMemo(() => {
        const user = currentUserId ? accountDB.entities[currentUserId] : null

        if (user) {
            const membership = membershipDB.entities[user.membershipId]
            return { ...user, ...membership }
        }

        return user
    }, [currentUserId, accountDB, membershipDB])

    const updatePassword = useCallback(
        (data: TUserDetailsSchema) => {
            if (!currentUserId) return
            dispatch(
                updateDBAccount({
                    id: currentUserId,
                    changes: {
                        avatar: data.avatar,
                        password: data.newPassword,
                    },
                })
            )
        },
        [currentUserId]
    )

    return {
        currentUser,
        authenticate,
        register,
        updatePassword,
    }
}
