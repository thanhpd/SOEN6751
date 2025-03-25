import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import accountDBSliceReducers from './accountDB'
import membershipDBSliceReducers from './membershipDB'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import currentUserIdSliceReducers from './currentUserId'
import tmpUserSliceReducers from './tmpUser'
import paymentMethodDBSliceReducers from './paymentMethodDB'
import currentOrderSliceReducers from './currentOrder'
import  calendarEventsSlice  from './CalendarDb'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['currentUserId', 'tmpUser', 'currentOrder'],
}

const rootReducer = combineReducers({
    accountDB: accountDBSliceReducers,
    membershipDB: membershipDBSliceReducers,
    currentUserId: currentUserIdSliceReducers,
    tmpUser: tmpUserSliceReducers,
    paymentMethodDB: paymentMethodDBSliceReducers,
    currentOrder: currentOrderSliceReducers,
    CalendarDb : calendarEventsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const persistor = persistStore(store)
