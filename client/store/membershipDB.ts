import { Membership } from '@/constants/types'
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

const membershipDBAdapter = createEntityAdapter<Membership>()

export const membershipDBSlice = createSlice({
  name: 'membershipDB',
  initialState: membershipDBAdapter.getInitialState(),
  reducers: {
    setDBMemberships: membershipDBAdapter.setAll,
    addDBMembership: membershipDBAdapter.addOne,

    // Update only expiry date
    updateDBMembershipExpiry: (
      state,
      action: PayloadAction<{ id: string; expiryDate: string }>
    ) => {
      const { id, expiryDate } = action.payload
      membershipDBAdapter.updateOne(state, {
        id,
        changes: { expiryDate },
      })
    },

    // 👇 Update only membership type
    updateDBMembershipType: (
      state,
      action: PayloadAction<{ id: string; membershipTypeId: string }>
    ) => {
      const { id, membershipTypeId } = action.payload
      membershipDBAdapter.updateOne(state, {
        id,
        changes: { membershipTypeId },
      })
    },
  },
})

// Export actions
export const {
  setDBMemberships,
  addDBMembership,
  updateDBMembershipExpiry,
  updateDBMembershipType, // 👈 added this
} = membershipDBSlice.actions

export default membershipDBSlice.reducer
