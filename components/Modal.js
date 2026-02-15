import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal, auth } = state

    const router = useRouter()

    const deleteUser = (item) => {
        dispatch(deleteItem(item.data, item.id, item.type))
        
        deleteData(`user/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const deleteCategories = (item) => {
        deleteData(`categories/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch(deleteItem(item.data, item.id, item.type))
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const deleteProduct = (item) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        deleteData(`product/${item.id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            return router.push('/')
        })
    }

    const handleSubmit = () => {
        if(modal.length !== 0){
            for(const item of modal){
                if(item.type === 'ADD_CART'){
                    dispatch(deleteItem(item.data, item.id, item.type))
                }

                if(item.type === 'ADD_USERS') deleteUser(item)
        
                if(item.type === 'ADD_CATEGORIES') deleteCategories(item)
        
                if(item.type === 'DELETE_PRODUCT') deleteProduct(item)
        
                dispatch({ type: 'ADD_MODAL', payload: [] })
            }
        }
    }

    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <motion.div 
                    className="modal-content-custom"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                    <div className="modal-header-custom">
                        <div className="modal-icon-wrapper">
                            <span className="modal-icon">⚠️</span>
                        </div>
                        <h5 className="modal-title-custom text-capitalize" id="exampleModalLabel">
                            {modal.length !== 0 && modal[0].title}
                        </h5>
                        <button type="button" className="close-btn" data-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body-custom">
                        <p>Are you sure you want to delete this item?</p>
                        <p className="modal-warning">This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer-custom">
                        <button 
                            type="button" 
                            className="btn btn-cancel"
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-delete-modal"
                            onClick={handleSubmit}
                            data-dismiss="modal"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .modal-content-custom {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                }
                
                .modal-header-custom {
                    padding: 24px 24px 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    position: relative;
                }
                
                .modal-icon-wrapper {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                }
                
                .modal-icon {
                    font-size: 2rem;
                }
                
                .modal-title-custom {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }
                
                .close-btn {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: #f1f5f9;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    color: #64748b;
                    transition: all 0.2s;
                }
                
                .close-btn:hover {
                    background: #e2e8f0;
                    color: #1e293b;
                }
                
                .modal-body-custom {
                    padding: 0 24px 24px;
                    text-align: center;
                }
                
                .modal-body-custom p {
                    color: #475569;
                    margin: 0;
                    font-size: 0.95rem;
                }
                
                .modal-warning {
                    color: #94a3b8 !important;
                    font-size: 0.875rem !important;
                    margin-top: 8px !important;
                }
                
                .modal-footer-custom {
                    padding: 16px 24px 24px;
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                }
                
                .btn-cancel {
                    padding: 12px 24px;
                    border-radius: 10px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    color: #475569;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .btn-cancel:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                }
                
                .btn-delete-modal {
                    padding: 12px 24px;
                    border-radius: 10px;
                    border: none;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .btn-delete-modal:hover {
                    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    )
}

export default Modal
