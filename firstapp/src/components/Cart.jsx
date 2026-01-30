import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (!userId) {
      alert("Please login first")
      navigate("/login")
      return
    }
    fetchCart()
  }, [userId, navigate])

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/cart", {
        params: { userId }
      })

      if (res.status === 200) {
        setCart(res.data)
      }
    } catch (err) {
      console.log("Error fetching cart", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {cart.items.map((item) => (
            <div className="col" key={item._id}>
              <div className="card h-100">
                <div className="card-body">

                  {item.product ? (
                    <>
                      <h5 className="card-title">
                        <b>Name:</b> {item.product.name}
                      </h5>
                      <p><b>Price:</b> {item.product.price}</p>
                      <p><b>Category:</b> {item.product.category}</p>
                      <p><b>Description:</b> {item.product.description}</p>
                      <p><b>Stock:</b> {item.product.stock}</p>
                    </>
                  ) : (
                    <p className="text-danger">Product not available</p>
                  )}

                  <p><b>Quantity:</b> {item.quantity}</p>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}