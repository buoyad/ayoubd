import { colors } from './colors'

// referencing https://www.joshwcomeau.com/react/dark-mode/

const localStorageKey = 'color-mode'

export const getThemePreference = () => {
  const pref = window.localStorage.getItem(localStorageKey)
  return pref === 'light' || pref === 'dark' ? pref : undefined
}

export const setThemePreference = (pref: 'light' | 'dark' | undefined) => {
  if (pref === undefined) {
    window.localStorage.removeItem(localStorageKey)
    return
  }
  window.localStorage.setItem(localStorageKey, pref)
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)
  if (result) {
    result[1] = result[1] + result[1]
    result[2] = result[2] + result[2]
    result[3] = result[3] + result[3]
  } else {
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  }
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const generateCSSVars = (light: boolean) => {
  return Object.entries(light ? colors.light : colors.dark).flatMap(
    ([key, value]) => {
      const rgb = hexToRgb(value)
      let res = [`--color-${key}: ${value}`]
      if (rgb) {
        res.push(`--color-${key}-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b}`)
      }
      return res
    },
  )
}

export const SetInitialColors = () => {
  let codeToRunOnClient = `
    (function() {
        function getInitialColorMode() {
            const persistedColorPreference = window.localStorage.getItem('${localStorageKey}');
            const hasPersistedPreference = typeof persistedColorPreference === 'string';
            // If the user has explicitly chosen light or dark,
            // let's use it. Otherwise, this value will be null.
            if (hasPersistedPreference) {
                return persistedColorPreference;
            }
            // If they haven't been explicit, let's check the media
            // query
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            const hasMediaQueryPreference = typeof mql.matches === 'boolean';
            if (hasMediaQueryPreference) {
                return mql.matches ? 'dark' : 'light';
            }
            // If they are using a browser/OS that doesn't support
            // color themes, let's default to 'light'.
            return 'light';
        }

        const colorMode = getInitialColorMode();

        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.type = 'text/css';
        const cssLight = ':root { --initial-color-mode: ' + colorMode + ';' + '${generateCSSVars(
          true,
        ).join('; ')}' + '}';
        const cssDark =  ':root { --initial-color-mode: ' + colorMode + ';' + '${generateCSSVars(
          false,
        ).join('; ')}' + '}';
        style.appendChild(document.createTextNode(colorMode === 'light' ? cssLight : cssDark));
        head.appendChild(style);
        if (colorMode === 'dark') {
          document.documentElement.classList.add('dark');
        }
    })()
    `

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}
