/**
 *
 * MIT License
 *
 * Copyright 2021 Shogun, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import * as React from 'react'
import { forwardRef, Heading as ChakraHeading } from '@chakra-ui/react'

/**
 * @typedef { import("@chakra-ui/react").HeadingProps } ChakraHeadingProps
 * @typedef {{
 *  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
 *  children: React.ReactNode
 * }} HeadingProps
 */
const Heading = forwardRef((
  /** @type { HeadingProps & ChakraHeadingProps } */ props,
  /** @type { React.LegacyRef<HTMLHeadingElement> } */ ref,
) => {
  const { children, as = 'h2', ...rest } = props
  const sizeAttr = {
    h1: '2xl',
    h2: 'xl',
    h3: 'lg',
    h4: 'md',
    h5: 'md',
    h6: 'md',
  }

  return (
    // @ts-ignore
    <ChakraHeading ref={ref} as={as} size={sizeAttr[as]} {...rest}>
      {children}
    </ChakraHeading>
  )
})

export default Heading
