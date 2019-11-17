import withStyledSystem from '../src/with-styled-system'
import { color, typography, space } from 'styled-system'

const Box = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export default withStyledSystem(
  Box,
  // Pass the style props that the component supports
  [color, space, typography]
)
