import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"
import type { CartItem, Guitar } from '../types'

export const useCart = () => {

  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return

      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)

    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }

  }

  function removeFromCart(id: Guitar['id']) {
    setCart(cart.filter(item => item.id !== id))
  }

  function increaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id: Guitar['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {

        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function cleanCart() {
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const total = useMemo(() => cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0), [cart])


  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    total,
  }
}