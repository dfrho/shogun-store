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
import { Menu as ChakraMenu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react'
import Container from 'Components/Container'
import Flex from 'Components/Flex'
import Icon from 'Components/Icon'
import Link from 'Components/Link'
import Text from 'Components/Text'
import HStack from 'Components/HStack'

/**
 * @typedef { import("@chakra-ui/react").MenuProps } ChakraMenuProps
 * @typedef { import("lib/types").MenuLinks } MenuLinks
 * @typedef {{
 *  content?: React.ReactChild
 *  links?: MenuLinks[]
 * }} MenuProps
 * @param { MenuProps & Omit<ChakraMenuProps, 'children'> } props
 */
const Mobile = props => {
  const { content, links = [], ...rest } = props
  /** @type { [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>> ] } */
  const [expandedItemLabel, setExpandedItemLabel] = React.useState()

  return (
    <Flex display={{ md: 'none' }} align="center">
      <ChakraMenu {...rest}>
        {({ isOpen }) => (
          <React.Fragment>
            <MenuButton verticalAlign="middle" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
              <Icon icon="HamburgerIcon" boxSize="6" />
            </MenuButton>

            <Portal>
              <MenuList display={{ md: 'none' }}>
                {content && (
                  <MenuItem as="div">
                    <Container px="3" py="2">
                      {content}
                    </Container>
                  </MenuItem>
                )}

                {links.map(({ label, slug, subMenuLinks }) => {
                  if (!subMenuLinks) {
                    return (
                      <MenuItem key={label} as="span">
                        <Link href={slug}>{label}</Link>
                      </MenuItem>
                    )
                  }

                  const isExpanded = label === expandedItemLabel

                  return (
                    <React.Fragment key={label}>
                      <MenuItem
                        onClickCapture={event => {
                          event.stopPropagation()
                          setExpandedItemLabel(previousItemLabel =>
                            previousItemLabel === label ? undefined : label,
                          )
                        }}
                      >
                        <Text>{label}</Text>
                        <Icon
                          icon={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'}
                          boxSize="6"
                        />
                      </MenuItem>

                      {isExpanded &&
                        subMenuLinks.map(({ label, slug }) => (
                          <MenuItem key={label} as="span" fontSize="sm" color="gray.600">
                            <Link href={slug}>{label}</Link>
                          </MenuItem>
                        ))}
                    </React.Fragment>
                  )
                })}
              </MenuList>
            </Portal>
          </React.Fragment>
        )}
      </ChakraMenu>
    </Flex>
  )
}

/**
 * @param { MenuProps & Omit<ChakraMenuProps, 'children' | 'content'> } props
 */
const Desktop = props => {
  const { links = [], ...rest } = props
  /** @type { [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>> ] } */
  const [expandedItemLabel, setExpandedItemLabel] = React.useState()

  return (
    <HStack display={{ base: 'none', md: 'block' }}>
      {links.map(({ label, slug, subMenuLinks }) => {
        if (!subMenuLinks) {
          return (
            <Container key={label} as="span" p="2">
              <Link href={slug}>{label}</Link>
            </Container>
          )
        }

        return (
          <ChakraMenu key={label} isOpen={label === expandedItemLabel} offset={[0, 3]} {...rest}>
            <Container
              as="span"
              p="2"
              cursor="pointer"
              onMouseEnter={() => setExpandedItemLabel(label)}
              onMouseLeave={() => setExpandedItemLabel(undefined)}
            >
              <MenuButton as={Flex} display="inline-flex">
                <Text as="span">{label}</Text>
                <Icon icon="ChevronDownIcon" boxSize="6" />
              </MenuButton>
            </Container>
            <Portal>
              <MenuList
                display={{ base: 'none', md: 'block' }}
                onMouseEnter={() => setExpandedItemLabel(label)}
                onMouseLeave={() => setExpandedItemLabel(undefined)}
              >
                {subMenuLinks.map(({ slug, label }) => (
                  <MenuItem key={label} as="span">
                    <Link href={slug} w="100%">
                      {label}
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Portal>
          </ChakraMenu>
        )
      })}
    </HStack>
  )
}

/**
 * @param { MenuProps & Omit<ChakraMenuProps, 'children'> } props
 */
const Menu = props => (
  <React.Fragment>
    <Mobile {...props} />
    <Desktop {...props} />
  </React.Fragment>
)

export default Menu
