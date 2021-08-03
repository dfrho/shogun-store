import { Collection } from 'lib/types'
import { cmsProducts } from './cmsProducts'

export const collection: Collection = {
  name: 'Top picks',
  slug: 'top-picks',
  descriptionHtml: "<p><b>This is a demonstration store.</b></p><p>Top picks won't let you go!</p>",
  products: cmsProducts,
}
