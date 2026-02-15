import Link from 'next/link'
import { decrease, increase } from '../store/Actions'
import { motion, AnimatePresence } from 'framer-motion'

const CartItem = ({ item, dispatch, cart }) => {
    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: { 
            opacity: 0, 
            x: 20,
            transition: {
                duration: 0.2
            }
        }
    }

    return (
        <motion.tr 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
        >
            <td style={{ width: '120px', overflow: 'hidden' }}>
                <motion.img 
                    src={item.images[0].url} 
                    alt={item.images[0].url}
                    className="img-thumbnail w-100"
                    style={{ 
                        minWidth: '100px', 
                        height: '100px',
                        borderRadius: '12px',
                        objectFit: 'cover'
                    }}
                    whileHover={{ scale: 1.05 }}
                />
            </td>

            <td style={{ minWidth: '250px' }} className="w-50 align-middle">
                <h5 className="text-capitalize text-secondary" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    <Link href={`/product/${item._id}`}>
                        <a style={{ color: '#475569', textDecoration: 'none' }}>
                            {item.title}
                        </a>
                    </Link>
                </h5>

                <h6 className="text-danger" style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '8px' }}>
                    ${(item.quantity * item.price).toFixed(2)}
                </h6>
                {item.inStock > 0 ? (
                    <p className="mb-1 text-success" style={{ fontSize: '0.875rem' }}>
                        ✓ {item.inStock} available
                    </p>
                ) : (
                    <p className="mb-1 text-danger" style={{ fontSize: '0.875rem' }}>
                        ✕ Out of stock
                    </p>
                )}
            </td>

            <td className="align-middle" style={{ minWidth: '150px' }}>
                <div className="quantity-controls">
                    <motion.button 
                        className="btn btn-quantity"
                        onClick={() => dispatch(decrease(cart, item._id))}
                        disabled={item.quantity === 1}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        −
                    </motion.button>

                    <motion.span 
                        className="quantity-display"
                        key={item.quantity}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {item.quantity}
                    </motion.span>

                    <motion.button 
                        className="btn btn-quantity"
                        onClick={() => dispatch(increase(cart, item._id))}
                        disabled={item.quantity === item.inStock}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        +
                    </motion.button>
                </div>
            </td>

            <td className="align-middle" style={{ minWidth: '50px', cursor: 'pointer' }}>
                <motion.i 
                    className="fas fa-trash-alt text-danger" 
                    aria-hidden="true" 
                    style={{ fontSize: '20px' }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    data-toggle="modal" 
                    data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{ data: cart, id: item._id, title: item.title, type: 'ADD_CART' }]
                    })}
                />
            </td>

            <style jsx>{`
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .btn-quantity {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    color: #475569;
                    font-size: 1.25rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }
                
                .btn-quantity:hover:not(:disabled) {
                    background: #2563eb;
                    border-color: #2563eb;
                    color: white;
                }
                
                .btn-quantity:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                
                .quantity-display {
                    min-width: 40px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: #1e293b;
                }
            `}</style>
        </motion.tr>
    )
}

export default CartItem
