import { useAppSelector, useAppDispatch } from '@/lib/hooks/redux'
import { toggleTheme, setTheme, type ThemeMode } from '@/lib/store/features/themeSlice'

export function useTheme() {
    const theme = useAppSelector((state) => state.theme.mode)
    const dispatch = useAppDispatch()

    const setThemeMode = (mode: ThemeMode) => {
        dispatch(setTheme(mode))
    }

    const toggle = () => {
        dispatch(toggleTheme())
    }

    return {
        theme,
        setTheme: setThemeMode,
        toggleTheme: toggle,
        isDark: theme === 'dark',
        isLight: theme === 'light'
    }
}