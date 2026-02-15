import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'

function NavBar() {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth, cart } = state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const isActive = (r) => {
        if (r === router.pathname) {
            return " nav-link-active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
        return router.push('/')
    }

    const adminRouter = () => {
        return (
            <>
                <Link href="/users">
                    <a className="dropdown-item">Users</a>
                </Link>
                <Link href="/create">
                    <a className="dropdown-item">Products</a>
                </Link>
                <Link href="/categories">
                    <a className="dropdown-item">Categories</a>
                </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
                <a 
                    className="nav-link dropdown-toggle nav-user-link" 
                    href="#" 
                    id="navbarDropdownMenuLink" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsDropdownOpen(!isDropdownOpen)
                    }}
                >
                    <motion.div 
                        className="user-avatar-container"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img 
                            src={auth.user.avatar} 
                            alt={auth.user.avatar} 
                            className="user-avatar"
                        />
                    </motion.div>
                    <span className="user-name">{auth.user.name}</span>
                </a>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div 
                            className="dropdown-menu-custom"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/profile">
                                <a className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                                    <i className="fas fa-user-circle mr-2"></i> Profile
                                </a>
                            </Link>
                            {auth.user.role === 'admin' && adminRouter()}
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt mr-2"></i> Logout
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </li>
        )
    }

    return (
        <nav className="navbar-custom navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand-custom">
                        <span className="brand-icon">🛒</span>
                        <span className="brand-text">ShopZone</span>
                    </a>
                </Link>
                <button 
                    className="navbar-toggler-custom" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav-custom navbar-nav p-1">
                        <li className="nav-item">
                            <Link href="/cart">
                                <a className={"nav-link-custom" + isActive('/cart')}>
                                    <motion.div 
                                        className="cart-icon-container"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                                        {cart.length > 0 && (
                                            <motion.span 
                                                className="cart-badge"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                            >
                                                {cart.length}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                    <span className="nav-link-text">Cart</span>
                                </a>
                            </Link>
                        </li>
                        {Object.keys(auth).length === 0 ? (
                            <li className="nav-item">
                                <Link href="/signin">
                                    <a className={"nav-link-custom" + isActive('/signin')}>
                                        <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                                        <span className="nav-link-text">Sign in</span>
                                    </a>
                                </Link>
                            </li>
                        ) : (
                            loggedRouter()
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
