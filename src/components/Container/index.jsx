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
import { Box, Container as ChakraContainer, forwardRef, useStyleConfig } from '@chakra-ui/react'

/**
 * @typedef { import("@chakra-ui/react").ContainerProps } ChakraContainerProps
 * @typedef {{
 *  variant?: 'solid' | 'outline' | 'promo' | 'section-wrapper',
 *  constrainContent?: boolean
 *  centerContent?: boolean
 *  children?: React.ReactNode
 * }} ContainerProps
 */
const Container = forwardRef(
  (
    /** @type {ContainerProps & ChakraContainerProps }*/
    props,
    /** @type {React.LegacyRef<HTMLDivElement>} */
    ref,
  ) => {
    const { variant, centerContent, constrainContent, children, ...rest } = props

    let styles = useStyleConfig('ShogunContainer', { variant })

    if (constrainContent) {
      return (
        <ChakraContainer ref={ref} sx={styles} centerContent {...rest}>
          {children}
        </ChakraContainer>
      )
    }

    if (centerContent) {
      styles = { ...styles, display: 'flex', flexDirection: 'column', alignItems: 'center' }
    }

    return (
      <Box ref={ref} sx={styles} {...rest}>
        {children}
      </Box>
    )
  },
)

export default Container
