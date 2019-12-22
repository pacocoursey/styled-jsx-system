import React, { useContext } from 'react'
import css from 'styled-jsx/css'
import cn from 'classnames'
import objss from 'objss'

import { createContext } from 'react'

// Theme support
const Theme = createContext({})
const useTheme = () => useContext(Theme)
export const ThemeProvider = ({ children, value, theme }) => {
  if (!value && !theme) {
    throw new Error('Must provide either value or theme.')
  }

  // Support both <ThemeProvider value={...}> and <ThemeProvider theme={...}>
  // (latter being styled-components standard)
  return <Theme.Provider value={value || theme}>{children}</Theme.Provider>
}

const createMediaQuery = (breakpoint, rules) =>
  css.resolve`
    @media (min-width: ${breakpoint}) {
      ${objss(rules)}
    }
  `

const styler = (props, opts, theme) => {
  const styleObjects = []
  const mediaQueries = []

  opts.forEach(opt => {
    // Disable breakpoint cache because it causes hydration error on SSR
    const rules = opt({
      ...props,
      theme: { ...theme, disableStyledSystemCache: true }
    })

    Object.entries(rules).forEach(([key, value]) => {
      if (key.startsWith('@media')) {
        const breakpoint = key
          .split('@media screen and (min-width: ')
          .pop()
          .replace(')', '')
        mediaQueries.push(createMediaQuery(breakpoint, value))
      } else {
        // Not a media query, just regular styling
        styleObjects.push({ [key]: value })
      }
    })
  })

  const styles = Object.assign({}, ...styleObjects)

  return [
    css.resolve`
      ${objss(styles)}
    `,
    ...mediaQueries
  ]
}

const HOC = (Component, opts) => {
  const Comp = ({ className, children, ...props }) => {
    const theme = useTheme()
    const styles = styler(props, opts, theme)

    return (
      <Component
        {...props}
        className={cn(className, [...styles.map(s => s.className)])}
      >
        {children}
        {styles.map((s, i) => {
          return (
            <React.Fragment key={`styled-system-${i}`}>
              {s.styles}
            </React.Fragment>
          )
        })}
      </Component>
    )
  }

  return Comp
}

export default HOC
