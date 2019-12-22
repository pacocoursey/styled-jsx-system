import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import withStyledSystem, { ThemeProvider } from 'styled-jsx-system'
import Box from '../components/box'
import * as styledSystem from 'styled-system'

const scope = { Box, ThemeProvider, styledSystem, withStyledSystem }

const code = `
() => {
  const BoxComponent = ({ className, children }) => (
    <div className={className}>{children}</div>
  )

  const Box = withStyledSystem(
    BoxComponent,
    // Add more styled system props here
    [styledSystem.color, styledSystem.space, styledSystem.border]
  )

  // Custom Styled System theme
  const theme = {
    colors: {
      gray: ['#fafafa', '#efefef', '#666']
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        color="gray.2"
        p={10}
        m={2}
        borderRadius={8}
      >
        With custom theme specification
      </Box>

      <Box
        color="#fff"
        bg={['#900', '#900fff', '#666']}
        p={10}
        m={2}
        borderRadius={8}
      >
        With responsive props
      </Box>
    </ThemeProvider>
  )
}
`

const syntaxTheme = {
  plain: {
    color: 'var(--geist-foreground)',
    backgroundColor: 'var(--geist-background)'
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#666'
      }
    },
    {
      types: ['string', 'number', 'builtin', 'variable'],
      style: {
        color: '#494949'
      }
    },
    {
      types: ['class-name', 'function', 'tag', 'attr-name'],
      style: {
        color: '#333'
      }
    }
  ]
}

const Index = () => {
  return (
    <main>
      <LiveProvider code={code} scope={scope} theme={syntaxTheme}>
        <LivePreview />
        <div className="editor">
          <LiveEditor />
        </div>
        <LiveError />
      </LiveProvider>

      {/* <Box color="#fff" bg={['#FF0080', '#7928CA', '#0070F3']}>
        Box component here
      </Box> */}

      <style jsx>{`
        main {
          max-width: 90vw;
          margin: 10em auto 0 auto;
          width: 700px;
          font-size: 16px;
        }

        .editor {
          margin-top: 3em;
          background: #f2f2f2;
          border-radius: 8px;
          width: 100%;
        }

        .editor :global(textarea), .editor :global(pre) {
          line-height: 1.7 !important;
        }

        .editor :global(textarea:focus) {
          outline: none;
          box-shadow: 0 0 0 1px #b5b5b5;
        }
      `}</style>
    </main>
  )
}

export default Index
