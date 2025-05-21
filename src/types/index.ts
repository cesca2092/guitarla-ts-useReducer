import { ActionDispatch } from "react"
import { CartActions } from "../reducers/cart-reducer"

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
  dispatch: ActionDispatch<[action: CartActions]>
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

