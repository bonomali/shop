export const state = () => ({
  sale: false,
  products: [
    {
      name: 'First #OMA product!',
      price: 0.0,
      category: 'oma',
      sale: true,
      article: 'product5',
      img: 'oma.png'
    },
    {
      name: 'This could be your product',
      price: 999.99,
      category: 'oma',
      sale: false,
      article: 'product42',
      img: 'oma.png'
    }
  ]
})
