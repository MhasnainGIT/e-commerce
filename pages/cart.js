import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import { getData, postData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state

  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [callback, setCallback] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(res)
    }

    getTotal()
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__devat'))
    if (cartLocal && cartLocal.length > 0) {
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if (inStock > 0) {
            newArr.push({
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    }
  }, [callback])

  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({ type: 'NOTIFY', payload: { error: 'Please add your address and mobile.' } })

    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`)
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item)
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback)
      return dispatch({ type: 'NOTIFY', payload: {
        error: 'The product is out of stock or the quantity is insufficient.'
      }})
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    postData('order', { address, mobile, cart, total }, auth.token)
      .then(res => {
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch({ type: 'ADD_CART', payload: [] })

        const newOrder = {
          ...res.newOrder,
          user: auth.user
        }
        dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push(`/order/${res.newOrder._id}`)
      })
  }

  if (cart.length === 0) {
    return (
      <motion.div 
        className="empty-cart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Head>
          <title>Cart - ShopZone</title>
        </Head>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your Cart is Empty</h2>
          <p className="empty-cart-description">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/">
            <motion.a 
              className="btn btn-primary btn-shop-now"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.a>
          </Link>
        </div>
        <style jsx>{`
          .empty-cart-container {
            min-height: calc(100vh - 200px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .empty-cart {
            text-align: center;
            max-width: 400px;
          }
          .empty-cart-icon {
            font-size: 5rem;
            margin-bottom: 1.5rem;
          }
          .empty-cart-title {
            font-size: 1.75rem;
            color: #1e293b;
            margin-bottom: 0.75rem;
            font-weight: 700;
          }
          .empty-cart-description {
            color: #64748b;
            margin-bottom: 2rem;
            font-size: 1rem;
          }
          .btn-shop-now {
            padding: 14px 32px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 12px;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
          }
        `}</style>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Head>
        <title>Cart - ShopZone</title>
      </Head>

      <div className="row mx-auto">
        <div className="col-md-8 text-secondary table-responsive my-3">
          <motion.h2 
            className="text-uppercase cart-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            🛒 Shopping Cart
          </motion.h2>

          <div className="cart-items-container">
            <AnimatePresence>
              {cart.map(item => (
                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          className="col-md-4 my-3 text-right text-uppercase text-secondary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="shipping-card">
            <form>
              <h2 className="shipping-title">📦 Shipping</h2>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input 
                  type="text" 
                  name="address" 
                  id="address"
                  className="form-control-custom" 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input 
                  type="text" 
                  name="mobile" 
                  id="mobile"
                  className="form-control-custom" 
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </form>

            <div className="total-section">
              <h3>Total: <span className="total-amount">${total.toFixed(2)}</span></h3>
            </div>

            <Link href={auth.user ? '#!' : '/signin'}>
              <motion.a 
                className="btn btn-payment"
                onClick={handlePayment}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed with Payment
              </motion.a>
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .cart-page {
          padding: 2rem 0;
        }
        
        .cart-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .cart-items-container {
          background: white;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .shipping-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 100px;
        }
        
        .shipping-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.25rem;
          text-align: left;
        }
        
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        
        .form-control-custom {
          width: 100%;
          padding: 12px 16px;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
          transition: all 0.2s ease;
        }
        
        .form-control-custom:focus {
          outline: none;
          border-color: #2563eb;
          background: white;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .total-section {
          padding: 1.5rem 0;
          border-top: 2px solid #e2e8f0;
          margin-top: 1rem;
        }
        
        .total-section h3 {
          font-size: 1.25rem;
          color: #1e293b;
        }
        
        .total-amount {
          color: #2563eb;
          font-weight: 700;
          font-size: 1.5rem;
        }
        
        .btn-payment {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          border: none;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .shipping-card {
            position: static;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  )
}

export default Cart
