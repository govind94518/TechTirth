import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ThemeMode = 'light' | 'dark'

export interface ThemeState {
    mode: ThemeMode
}

// Check if we're in browser environment
const getInitialTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as ThemeMode | null
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light' // Default for SSR
}

const initialState: ThemeState = {
    mode: getInitialTheme()
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.mode)
            }
        },
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.mode)
            }
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer