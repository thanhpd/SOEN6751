import { useAppDispatch, useAppSelector } from '@/store'
import { updateDBAccount } from '@/store/accountDB'
import { useCallback } from 'react'

export function useForgetPassword() {
    const dispatch = useAppDispatch()
    const accountDB = useAppSelector(state => state.accountDB)
    const membershipDB = useAppSelector(state => state.membershipDB)

    const checkEmailToForget = useCallback(
        (email: string) => {
            const account = Object.values(accountDB.entities).find(
                acc => acc.email === email
            )

            if (!account) {
                return {
                    success: false,
                    message: 'Email not found in the system',
                }
            }

            const membership = membershipDB.entities[account.membershipId]

            if (!membership) {
                return {
                    success: false,
                    message: 'Membership not found in the system',
                }
            }

            return {
                success: true,
                user: {
                    id: account.id,
                    email: account.email,
                    name: membership.firstName + ' ' + membership.lastName,
                    avatar: account.avatar,
                },
            }
        },
        [membershipDB, accountDB]
    )

    const resetPassword = useCallback(
        ({ id, password }: { id: string; password: string }) => {
            dispatch(
                updateDBAccount({
                    id,
                    changes: {
                        password,
                    },
                })
            )
        },
        []
    )

    return { checkEmailToForget, resetPassword }
}
