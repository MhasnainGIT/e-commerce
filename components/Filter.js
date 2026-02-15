import React, { useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Filter = ({ state }) => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const { categories } = state
    const router = useRouter()

    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({ router, category: e.target.value })
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({ router, sort: e.target.value })
    }

    useEffect(() => {
        filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
    }, [search])

    const containerVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div 
            className="filter-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="filter-category">
                <select 
                    className="custom-select filter-select"
                    value={category} 
                    onChange={handleCategory}
                >
                    <option value="all">🏷️ All Categories</option>
                    {categories.map(item => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </motion.div>

            <motion.div variants={itemVariants} className="filter-search">
                <form autoComplete="off" className="search-form">
                    <div className="search-input-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            type="text" 
                            className="form-control search-input" 
                            list="title_product"
                            value={search.toLowerCase()} 
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search products..."
                        />
                    </div>
                </form>
            </motion.div>

            <motion.div variants={itemVariants} className="filter-sort">
                <select 
                    className="custom-select filter-select"
                    value={sort} 
                    onChange={handleSort}
                >
                    <option value="-createdAt">✨ Newest First</option>
                    <option value="oldest">📅 Oldest First</option>
                    <option value="-sold">🔥 Best Sellers</option>
                    <option value="-price">⬆️ Price: High-Low</option>
                    <option value="price">⬇️ Price: Low-High</option>
                </select>
            </motion.div>

            <style jsx>{`
                .filter-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding: 24px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                    margin-bottom: 24px;
                    align-items: center;
                }
                
                .filter-category,
                .filter-sort {
                    flex: 1;
                    min-width: 180px;
                }
                
                .filter-search {
                    flex: 2;
                    min-width: 280px;
                }
                
                .filter-select {
                    width: 100%;
                    padding: 12px 16px;
                    font-size: 0.95rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    background: white;
                    color: #475569;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 16px center;
                }
                
                .filter-select:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
                
                .search-form {
                    width: 100%;
                }
                
                .search-input-wrapper {
                    position: relative;
                }
                
                .search-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    font-size: 1rem;
                }
                
                .search-input {
                    width: 100%;
                    padding: 12px 16px 12px 44px;
                    font-size: 0.95rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    background: white;
                    color: #1e293b;
                    transition: all 0.2s ease;
                }
                
                .search-input:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }
                
                .search-input::placeholder {
                    color: #94a3b8;
                }
                
                @media (max-width: 768px) {
                    .filter-container {
                        flex-direction: column;
                    }
                    
                    .filter-category,
                    .filter-sort,
                    .filter-search {
                        width: 100%;
                        min-width: unset;
                    }
                }
            `}</style>
        </motion.div>
    )
}

export default Filter
