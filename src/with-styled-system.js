import React from 'react'
import objss from 'objss'
import css from 'styled-jsx/css'
import cn from 'classnames'

const createMobileQuery = rules => css.resolve`
  @media (min-width: 40em) {
    ${objss(rules)}
  }
`

const createTabletQuery = rules => css.resolve`
  @media (min-width: 52em) {
    ${objss(rules)}
  }
`

const styler = (props, opts) => {
  const styleObjects = []
  const mediaQueries = []

  opts.forEach(opt => {
    const x = opt(props)

    Object.entries(x).forEach(([key, value]) => {
      if (key.startsWith('@media')) {
        // Brittle check to generate the correct media query
        if (key.includes('40em')) {
          mediaQueries.push(createMobileQuery(value))
        } else {
          mediaQueries.push(createTabletQuery(value))
        }
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
    const styles = styler(props, opts)

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
