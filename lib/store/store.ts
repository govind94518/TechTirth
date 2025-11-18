import {configureStore} from '@reduxjs/toolkit'
import {counterSlice} from "@/lib/store/features/counterSlice";
import themeReducer from '../store/features/themeSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice.reducer,
            theme: themeReducer
        }
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']