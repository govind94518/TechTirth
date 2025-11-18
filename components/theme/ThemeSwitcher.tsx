'use client'
import {useEffect, useState} from 'react'
import {useAppSelector, useAppDispatch} from '@/lib/hooks/redux'
import {toggleTheme} from '@/lib/store/features/themeSlice'

interface ThemeSwitcherProps {
    className?: string
    'aria-label'?: string
}

export default function ThemeSwitcher({
                                          className = '',
                                          'aria-label': ariaLabel = 'Toggle theme'
                                      }: ThemeSwitcherProps) {
    const theme = useAppSelector((state) => state.theme.mode)
    const dispatch = useAppDispatch()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleToggle = (): void => {
        dispatch(toggleTheme())
    }

    // Return a placeholder during SSR that matches the default state
    if (!mounted) {
        return (
            <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
                aria-label={ariaLabel}
                type="button"
                disabled
            >
                <span
                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 translate-x-1"/>
                <span className="sr-only">Loading theme switcher</span>
            </button>
        )
    }

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
            aria-label={ariaLabel}
            type="button"
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
            <span className="sr-only">
                {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            </span>
        </button>
    )
}

export function ThemeButton({
                                className = '',
                                'aria-label': ariaLabel = 'Toggle theme'
                            }: ThemeSwitcherProps) {
    const theme = useAppSelector((state) => state.theme.mode)
    const dispatch = useAppDispatch()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleToggle = (): void => {
        dispatch(toggleTheme())
    }

    // Return a placeholder during SSR
    if (!mounted) {
        return (
            <button
                className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
                aria-label={ariaLabel}
                type="button"
                disabled
            >
                {/* Default to sun icon during loading */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        )
    }

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
            aria-label={ariaLabel}
            type="button"
        >
            {
                theme === 'light'
                    ?
                    (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                  clipRule="evenodd"/>
                        </svg>
                    )
                    :
                    (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        </svg>
                    )
            }
        </button>
    )
}