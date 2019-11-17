import Box from '../components/box'
import { ThemeProvider } from '../src'

const myTheme = {
  colors: {
    gray: ['#fafafa', '#efefef', '#666'],
  }
}

const Index = () => {
  return (
    <div>
      <ThemeProvider theme={myTheme}>
        <Box color="gray.2">Box component using a custom theme</Box>
      </ThemeProvider>
    </div>
  )
}

export default Index
