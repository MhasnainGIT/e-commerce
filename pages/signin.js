import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
    const res = await postData('auth/login', userData)

    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    }})

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="auth-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Head>
        <title>Sign In - ShopZone</title>
      </Head>

      <div className="auth-container">
        <motion.div className="auth-card" variants={itemVariants}>
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="exampleInputEmail1">
                <span className="input-icon">📧</span> Email address
              </label>
              <input 
                type="email" 
                className="form-control-custom" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                name="email" 
                value={email} 
                onChange={handleChangeInput}
                placeholder="Enter your email"
              />
              <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <label htmlFor="exampleInputPassword1">
                <span className="input-icon">🔒</span> Password
              </label>
              <input 
                type="password" 
                className="form-control-custom" 
                id="exampleInputPassword1"
                name="password" 
                value={password} 
                onChange={handleChangeInput}
                placeholder="Enter your password"
              />
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn btn-primary-auth"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              Sign In
            </motion.button>

            <p className="auth-footer">
              Don't have an account? <Link href="/register"><a>Register Now</a></Link>
            </p>
          </form>
        </motion.div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        }
        
        .auth-container {
          width: 100%;
          max-width: 440px;
        }
        
        .auth-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .auth-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .auth-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }
        
        .auth-header p {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }
        
        .auth-form .form-group {
          margin-bottom: 20px;
        }
        
        .auth-form label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }
        
        .input-icon {
          font-size: 1rem;
        }
        
        .form-control-custom {
          width: 100%;
          padding: 14px 16px;
          font-size: 0.95rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.2s ease;
        }
        
        .form-control-custom:focus {
          outline: none;
          border-color: #2563eb;
          background: white;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .form-control-custom::placeholder {
          color: #94a3b8;
        }
        
        .form-text {
          display: block;
          margin-top: 6px;
          font-size: 0.8rem;
          color: #94a3b8;
        }
        
        .btn-primary-auth {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
          cursor: pointer;
          margin-top: 8px;
        }
        
        .btn-primary-auth:hover {
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        .auth-footer {
          text-align: center;
          margin-top: 24px;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .auth-footer a {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
        }
        
        .auth-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </motion.div>
  )
}

export default Signin
