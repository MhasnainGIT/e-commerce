import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { motion } from 'framer-motion'

const ProductItem = ({ product, handleCheck }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
        return (
            <>
                <Link href={`product/${product._id}`}>
                    <motion.a 
                        className="btn btn-view"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ marginRight: '5px', flex: 1 }}
                    >
                        View
                    </motion.a>
                </Link>
                <motion.button 
                    className="btn btn-buy"
                    style={{ marginLeft: '5px', flex: 1 }}
                    disabled={product.inStock === 0 ? true : false}
                    whileHover={product.inStock > 0 ? { scale: 1.02 } : {}}
                    whileTap={product.inStock > 0 ? { scale: 0.98 } : {}}
                    onClick={() => dispatch(addToCart(product, cart))}
                >
                    Buy
                </motion.button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                <Link href={`create/${product._id}`}>
                    <motion.a 
                        className="btn btn-edit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ marginRight: '5px', flex: 1 }}
                    >
                        Edit
                    </motion.a>
                </Link>
                <motion.button 
                    className="btn btn-delete"
                    style={{ marginLeft: '5px', flex: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{ 
                            data: '', id: product._id, 
                            title: product.title, type: 'DELETE_PRODUCT' 
                        }]
                    })}
                >
                    Delete
                </motion.button>
            </>
        )
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    return(
        <motion.div 
            className="card"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            {auth.user && auth.user.role === 'admin' && (
                <input 
                    type="checkbox" 
                    checked={product.checked}
                    className="position-absolute"
                    style={{ height: '24px', width: '24px' }}
                    onChange={() => handleCheck(product._id)} 
                />
            )}
            <div className="card-img-container">
                <img 
                    className="card-img-top" 
                    src={product.images[0].url} 
                    alt={product.images[0].url} 
                />
            </div>
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>

                <div className="row justify-content-between mx-0">
                    <div className="price-tag">${product.price}</div>
                    {product.inStock > 0 ? (
                        <span className="stock-tag in-stock">
                            ✓ {product.inStock} in stock
                        </span>
                    ) : (
                        <span className="stock-tag out-of-stock">
                            ✕ Out of stock
                        </span>
                    )}
                </div>

                <p className="card-text" title={product.description}>
                    {product.description}
                </p>
                    
                <div className="product-actions">
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                </div>
            </div>
        </motion.div>
    )
}

export default ProductItem
