# styled-jsx-system

> This is a **proof of concept**. Don't use it, I'm just experimenting!

styled-jsx-system is a way to use [styled-system](https://github.com/styled-system/styled-system) with [styled-jsx](https://github.com/zeit/styled-jsx).

<br />

### Usage

You have a Box component that you style with styled-jsx:

```js
const Box = ({ children }) => {
  return (
    <div>
      {children}

      <style jsx>{`
        div {
          padding: 8px;
        }
      `}</style>
    </div>
  )
}

export default Box
```

If you want your Box to support styled-system props like [space](https://styled-system.com/table#space), export your Box component with the styled-jsx-system HOC and ensure you accept a `className` prop:

```diff
+ import { space } from 'styled-system'

- const Box = ({ children }) => {
+ const Box = ({ className, children }) => {
  return (
-   <div>
+   <div className={className}>
      {children}

      <style jsx>{`
        div {
          padding: 8px;
        }
      `}</style>
    </div>
  )
}

- export default Box
+ export default withStyledSystem(Box, [space])
```

That's it! You can now use styled-system props with your Box component:

```js
<Box m={[20, 10, 5]}>
  Hello
</Box>
```

<br />


#### More style props

To support more of styled-sytem's style props, add them to the second argument of the HOC:

```js
import { space, typography, color } from 'styled-system'

// ...

export default withStyledSystem(Box, [space, typography, color])

// <Box /> now supports props like `color`, `bg`, `fontSize`, etc...
```
