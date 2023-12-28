'use client'
import React from "react"
import { getThemePreference, setThemePreference } from "./dark-mode"
import { colors } from "./colors"
import { Box } from "./components"

export type Theme = 'light' | 'dark'

const ThemeContext = React.createContext<{
    theme: Theme | undefined,
    preference: Theme | undefined,
    setTheme: (theme: Theme | undefined) => void
}>({ theme: undefined, preference: undefined, setTheme: (colorMode) => { } })

export const useTheme = () => React.useContext(ThemeContext)

const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, rawSetTheme] = React.useState<Theme | undefined>(undefined)
    const [preference, setPreference] = React.useState<Theme | undefined>(undefined)

    React.useEffect(() => {
        const root = window.document.documentElement
        const initialMode = getComputedStyle(root).getPropertyValue('--initial-color-mode')
        // initialMode should always be light or dark, using the preference if saved or the system default.
        rawSetTheme(initialMode === 'light' ? 'light' : 'dark')
        // getThemePreference may return return light or dark if one has been set, or undefined if system default.
        setPreference(getThemePreference())
    }, [])

    React.useEffect(() => {
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        mql.onchange = (e) => {
            if (preference === undefined) {
                setTheme(e.matches ? 'dark' : 'light', false)
            }
        }
        return () => { mql.onchange = null }
    })

    const setTheme = (newValue: 'light' | 'dark' | undefined, savePreference: boolean = true) => {
        const newTheme = newValue ?? getSystemTheme()
        rawSetTheme(newTheme)
        savePreference && setPreference(newValue)
        savePreference && setThemePreference(newValue)

        const root = window.document.documentElement
        const c = newTheme === 'light' ? colors.light : colors.dark
        Object.entries(c).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value)
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, preference, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const ColorMode = () => {
    const { theme, preference, setTheme } = useTheme()

    const style = (option: Theme | undefined) => {
        const common = {
            cursor: 'pointer',
            color: 'var(--color-primary)',
            transition: 'font-weight 350ms'
        }
        if (!theme) {
            return common
        }
        if (preference === option) {
            return { ...common, fontWeight: 'bold' }
        }
        return common
    }

    return <Box row={true}>
        <p onClick={() => setTheme('light')} style={style('light')}>light</p>
        <p onClick={() => setTheme('dark')} style={style('dark')}>dark</p>
        <p onClick={() => setTheme(undefined)} style={style(undefined)}>system</p>
    </Box>
}
