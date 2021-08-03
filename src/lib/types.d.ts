import * as React from 'react'

export interface Variant {
  _id: string
  name: string
  storefrontId: string
  price: number
  sku?: string
}

export interface MediaItem {
  _id: string
  details: {
    name: string
    src: string
    alt?: string
    width: number
    height: number
  }
}

export interface Thumbnail {
  alt?: string
  height: number
  mimeType: string
  name: string
  size: number
  src: string
  storageID: string
  width: number
  _type: string
}

export interface CmsProduct {
  externalId?: number
  name: string
  slug: string
  description: string
  descriptionHtml: string
  media: MediaItem[]
  variants: Variant[]
  thumbnail?: Thumbnail
  _highlightResult?: HighlightResult
}

export type HighlightResult = {
  [key in keyof Omit<CmsProduct, '_highlightResult'>]: {
    fullyHighlighted: boolean
    matchLevel: 'none' | 'partial' | 'full'
    matchedWords: string[]
    value: string
  }
}

export interface CheckoutProduct {
  id: string
  quantity: number
  title: string
  variant: {
    id: string
    image: {
      altText: string | null
      src: string
    }
    price: string
    product: {
      handle: string
    }
    title: string
  }
}

export interface Collection {
  name: string
  slug: string
  descriptionHtml: string
  products: CmsProduct[]
}

export interface MenuLinks {
  subMenuLinks?: MenuLinks[]
  label: string
  slug: string
}

export interface Menu {
  name: string
  menuLinks: MenuLinks[]
}

export type PropsOf<C> = React.ComponentPropsWithRef<C>
