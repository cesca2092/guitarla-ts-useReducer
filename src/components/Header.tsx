import { ActionDispatch, useMemo } from "react"
import type { CartItem } from "../types"
import { CartActions } from "../reducers/cart-reducer"

type HeaderProps = {
  cart: CartItem[]
  dispatch: ActionDispatch<[action: CartActions]>
}

const Header = (props: HeaderProps) => {

  const {
    cart,
    dispatch,
  } = props


  // State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const total = useMemo(() => cart.reduce((prev, curr) => prev + curr.price * curr.quantity, 0), [cart])

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cart.map(item => (
                            <tr key={item.id}>
                              <td>
                                <img className="img-fluid" src={`/img/${item.image}.jpg`}
                                  alt="imagen guitarra" />
                              </td>
                              <td>{item.name}</td>
                              <td className="fw-bold">
                                ${item.price}
                              </td>
                              <td className="flex align-items-start gap-4">
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => dispatch({ type: "decrease-quantity", payload: { id: item.id } })}
                                >
                                  -
                                </button>
                                {item.quantity}
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => dispatch({ type: "increase-quantity", payload: { id: item.id } })}
                                >
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => dispatch({ type: "remove-from-cart", payload: { id: item.id } })}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))
                        }

                      </tbody>
                    </table>

                    <p className="text-end">Total pagar: <span className="fw-bold">${total}</span></p>
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={() => dispatch({ type: "clean-cart" })}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header