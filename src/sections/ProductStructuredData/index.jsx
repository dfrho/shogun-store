import React from 'react'
import Head from 'frontend-head'
import { useRouter } from 'frontend-router'
import { useCartActions } from 'frontend-checkout'

/**
 * @typedef { import("lib/types").CmsProduct } CmsProduct
 * @typedef { import("lib/types").Variant } Variant
 * @typedef {{
 *  product: CmsProduct
 * }} ProductStructuredDataProps
 * @param { ProductStructuredDataProps } props
 */
const ProductStructuredData = ({ product }) => {
  const router = useRouter()
  const { isProductAvailableForSale } = useCartActions()

  if (!product) return null

  const { name, thumbnail, variants, description, externalId } = product
  const variant = variants && variants[0]
  const availableForSale = isProductAvailableForSale({ id: variant.storefrontId })
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: thumbnail ? thumbnail.src : undefined,
    sku: (variant || []).sku,
    mpn: externalId,
    brand: {
      '@type': 'Organization',
      name: 'Shogun',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: (variant || []).price,
      availability: availableForSale ? 'InStock' : 'OutOfStock',
      url: `https://shogun-starter-kit-mvp.frontend.getshogun.com${router.pathname}`,
      seller: {
        '@type': 'Shogun',
        name: 'Shogun',
      },
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  )
}

export default ProductStructuredData
