'use client'
import { useEffect, ReactNode } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks/redux'
import { setTheme } from '@/lib/store/features/themeSlice'

interface ThemeProviderProps {
    children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const theme = useAppSelector((state) => state.theme.mode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Apply theme to document
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    useEffect(() => {
        // Handle system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            const savedTheme = localStorage.getItem('theme')
            if (!savedTheme) {
                dispatch(setTheme(e.matches ? 'dark' : 'light'))
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [dispatch])

    return <>{children}</>
}