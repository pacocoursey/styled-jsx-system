import styledJsxSystem from 'styled-jsx-system'
import { color, typography, space } from 'styled-system'

const Box = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export default styledJsxSystem(
  Box,
  // Pass the style props that the component supports
  [color, space, typography]
)
