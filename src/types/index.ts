export type Guitar = {
  id: number
  name: string
  image: string
  description: string
  price: number
  // quantity: number | null
}

export type GuitarProps = {
  guitar: Guitar,
  addToCart: (item: Guitar) => void
}

export type CartItem = Guitar & {
  quantity: number
}


// export interface CartItem extends Guitar {
//   quantity: number
// }

// utility types
// pick
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//   quantity: number
// }

//omit
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price'> & {
//   quantity: number
// }

