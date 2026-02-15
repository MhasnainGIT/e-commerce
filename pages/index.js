import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'

import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Filter from '../components/Filter'
import { ProductGridSkeleton } from '../components/Skeleton'
import { motion } from 'framer-motion'

const Home = (props) => {
  const [products, setProducts] = useState(props.products)
  const [loading, setLoading] = useState(false)

  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if (product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if (product.checked) {
        deleteArr.push({
          data: '',
          id: product._id,
          title: 'Delete all selected products?',
          type: 'DELETE_PRODUCT'
        })
      }
    })

    dispatch({ type: 'ADD_MODAL', payload: deleteArr })
  }

  const handleLoadmore = () => {
    setLoading(true)
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
    setTimeout(() => setLoading(false), 500)
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      className="home_page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Head>
        <title>ShopZone - Your Premium E-Commerce Store</title>
        <meta name="description" content="Discover amazing products at great prices" />
      </Head>

      <Filter state={state} />

      {auth.user && auth.user.role === 'admin' && (
        <motion.div 
          className="delete_all btn btn-danger mt-2"
          style={{ marginBottom: '-10px' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input 
            type="checkbox" 
            checked={isCheck} 
            onChange={handleCheckALL}
            style={{ 
              width: '25px', 
              height: '25px', 
              transform: 'translateY(8px)',
              cursor: 'pointer',
              accentColor: '#2563eb'
            }} 
          />

          <button 
            className="btn btn-danger ml-2"
            data-toggle="modal" 
            data-target="#exampleModal"
            onClick={handleDeleteAll}
          >
            DELETE ALL
          </button>
        </motion.div>
      )}

      <div className="products">
        {products.length === 0 ? (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="empty-state-icon">📦</div>
            <h3 className="empty-state-title">No Products Found</h3>
            <p className="empty-state-description">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </motion.div>
        ) : (
          products.map(product => (
            <ProductItem 
              key={product._id} 
              product={product} 
              handleCheck={handleCheck} 
            />
          ))
        )}
      </div>

      {loading && <ProductGridSkeleton count={3} />}
      
      {!loading && props.result < page * 6 ? "" : (
        <motion.button 
          className="btn btn-outline-info d-block mx-auto mb-4 btn-load-more"
          onClick={handleLoadmore}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Loading...' : 'Load more'}
        </motion.button>
      )}

      <style jsx>{`
        .home_page {
          padding: 2rem 0;
          min-height: calc(100vh - 80px);
        }
        
        .btn-load-more {
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          border: 2px solid #2563eb;
          color: #2563eb;
          background: transparent;
          transition: all 0.3s ease;
        }
        
        .btn-load-more:hover {
          background: #2563eb;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }
        
        @media (max-width: 768px) {
          .home_page {
            padding: 1rem 0;
          }
        }
      `}</style>
    </motion.div>
  )
}


export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
  )
  
  return {
    props: {
      products: res.products,
      result: res.result
    },
  }
}

export default Home
