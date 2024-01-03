'use client'
import React from "react"
import { generateCSSVars, getThemePreference, setThemePreference } from "./dark-mode"
import { Box } from "./components"
import { Listbox } from "@headlessui/react"
import { styleSheet } from "./util"

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
        const properties = generateCSSVars(newTheme === 'light')
        properties.forEach(p => {
            const [name, val] = p.split(':')
            root.style.setProperty(name, val)
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, preference, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const ColorMode = ({ style }: { style?: React.CSSProperties }) => {
    const { theme, preference, setTheme } = useTheme()

    const optStyle = (option: Theme | undefined) => {
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

    // return <Listbox value={theme} onChange={setTheme}>
    //     <Listbox.Button style={}>{theme}</Listbox.Button>
    // </Listbox>

    return <Box row={true} style={style}>
        <p onClick={() => setTheme('light')} style={optStyle('light')}>light</p>
        <p onClick={() => setTheme('dark')} style={optStyle('dark')}>dark</p>
        <p onClick={() => setTheme(undefined)} style={optStyle(undefined)}>system</p>
    </Box>
}

const styles = styleSheet({
    dropdownButton: {

    }
})
